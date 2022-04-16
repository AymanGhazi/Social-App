using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<UserLike> Likes { get; set; }
        protected override void OnModelCreating(ModelBuilder Builder)
        {
            base.OnModelCreating(Builder);
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

        }


    }
}