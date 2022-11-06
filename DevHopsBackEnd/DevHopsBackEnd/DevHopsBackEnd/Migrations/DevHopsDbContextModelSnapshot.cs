﻿// <auto-generated />
using System;
using DevHopsBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DevHopsBackEnd.Migrations
{
    [DbContext(typeof(DevHopsDbContext))]
    partial class DevHopsDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DevHopsBackEnd.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte[]>("ImageData")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("ImageTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("DevHopsBackEnd.Models.StatusUpdate", b =>
                {
                    b.Property<string>("StatusUpdateId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ImageId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("WorkItemId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("StatusUpdateId");

                    b.HasIndex("ImageId");

                    b.HasIndex("WorkItemId");

                    b.ToTable("StatusUpdates");
                });

            modelBuilder.Entity("DevHopsBackEnd.Models.WorkItem", b =>
                {
                    b.Property<string>("WorkItemId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Assignee")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("WorkItemId");

                    b.ToTable("WorkItems");
                });

            modelBuilder.Entity("DevHopsBackEnd.Models.StatusUpdate", b =>
                {
                    b.HasOne("DevHopsBackEnd.Models.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId");

                    b.HasOne("DevHopsBackEnd.Models.WorkItem", null)
                        .WithMany("StatusUpdates")
                        .HasForeignKey("WorkItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");
                });

            modelBuilder.Entity("DevHopsBackEnd.Models.WorkItem", b =>
                {
                    b.Navigation("StatusUpdates");
                });
#pragma warning restore 612, 618
        }
    }
}
