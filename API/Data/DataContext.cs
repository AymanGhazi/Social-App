using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser,
     AppRole, int, IdentityUserClaim<int>, AppUserRole,
    IdentityUserLogin<int>, IdentityRoleClaim<int>,
     IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<UserLike> Likes { get; set; }
        public DbSet<message> Messages { get; set; }
        protected override void OnModelCreating(ModelBuilder Builder)
        {
            base.OnModelCreating(Builder);

            Builder.Entity<AppUser>()
            .HasMany(ur => ur.Roles)
            .WithOne(u => u.user)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();

            Builder.Entity<AppRole>()
          .HasMany(ur => ur.UserRoles)
          .WithOne(r => r.Role)
          .HasForeignKey(ur => ur.RoleId)
          .IsRequired();

            Builder.Entity<UserLike>()
            .HasKey(k => new { k.SourceUserID, k.LikedUserID });

            Builder.Entity<UserLike>()
            .HasOne(s => s.sourceUser)
            .WithMany(s => s.UsersILike)
            .HasForeignKey(s => s.SourceUserID)
            .OnDelete(DeleteBehavior.Cascade);

            Builder.Entity<UserLike>()
            .HasOne(s => s.LikedUser)
            .WithMany(s => s.ILikedByUsers)
            .HasForeignKey(s => s.LikedUserID)
            .OnDelete(DeleteBehavior.Cascade);
            //with sql use no action

            Builder.Entity<message>()
            .HasOne(u => u.Recipient)
            .WithMany(R => R.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);

            Builder.Entity<message>()
           .HasOne(u => u.Sender)
           .WithMany(R => R.MessagesSent)
           .OnDelete(DeleteBehavior.Restrict);
        }
    }
}