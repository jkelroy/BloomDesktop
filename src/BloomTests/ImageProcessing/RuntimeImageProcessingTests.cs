﻿using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using Bloom;
using NUnit.Framework;
using SIL.IO;


using Bloom.ImageProcessing;

namespace BloomTests.RuntimeImageProcessing
{
	[TestFixture]
	public class RuntimeImageProcessingTests
	{
		#if ShrinkLargeImages
		[Test]
		public void GetWideImage_ReturnsShrunkImageWithCorrectProportions()
		{
			using (var cache = new RuntimeImageProcessor(new BookRenamedEvent()) { TargetDimension = 100 })
			using (var file = MakeTempPNGImage(200,80))
			{
				using(var img = ImageUtils.GetImageFromFile(cache.GetPathToAdjustedImage(file.Path)))
				{
					Assert.AreEqual(100, img.Width);
					Assert.AreEqual(40, img.Height);
				}
			}
		}


		[Test]
		public void GetJPG_ReturnsShrunkJPG()
		{
			using (var cache = new RuntimeImageProcessor(new BookRenamedEvent()) { TargetDimension = 100 })
			using (var file = MakeTempJPGImage(200, 80))
			{
				var pathToResizedImage = cache.GetPathToAdjustedImage(file.Path);
				using (var img = ImageUtils.GetImageFromFile(pathToResizedImage))
				{
					Assert.AreEqual(".jpg", Path.GetExtension(pathToResizedImage));

					//TODO: why does this always report PNG format? Checks by hand of the file show it as jpg
					//Assert.AreEqual(ImageFormat.Jpeg.Guid, img.RawFormat.Guid);

					Assert.AreEqual(100, img.Width);
					Assert.AreEqual(40, img.Height);
				}
			}
		}
#endif

		[Test]
		public void GetTinyImage_DoesNotChangeSize()
		{
			using (var cache = new RuntimeImageProcessor(new BookRenamedEvent()) { TargetDimension = 100 })
			using (var file = MakeTempPNGImage(10,10))
			{
				using (var img = Bloom.ToPalaso.RobustImageIO.GetImageFromFile(cache.GetPathToAdjustedImage(file.Path)))
				{
					Assert.AreEqual(10, img.Width);
				}
			}
		}

		private TempFile MakeTempPNGImage(int width, int height)
		{
			var file = TempFile.WithExtension(".png");
			File.Delete(file.Path);
			using (var x = new Bitmap(width, height))
			{
				x.Save(file.Path, ImageFormat.Png);
			}
			return file;
		}

		private TempFile MakeTempJPGImage(int width, int height)
		{
			var file = TempFile.WithExtension(".jpg");
			File.Delete(file.Path);
			using (var x = new Bitmap(width, height))
			{
				x.Save(file.Path, ImageFormat.Jpeg);
			}
			return file;
		}
	}

}
