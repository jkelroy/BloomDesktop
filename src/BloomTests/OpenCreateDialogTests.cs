﻿using System.IO;
using Bloom.CollectionChoosing;
using Bloom.CollectionCreating;
using NUnit.Framework;

namespace BloomTests.ToPalaso
{

	[TestFixture]
	public class OpenAndCreateDialogTests
	{

		[Test, Ignore("By hand only")]
		public void LaunchDemoDialog()
		{
			var mru = new MostRecentPathsList();
			foreach (var dir in Directory.GetDirectories(NewCollectionWizard.DefaultParentDirectoryForCollections))
			{
				foreach (var path in Directory.GetFiles(dir, "*.bloomCollection"))
				{
					mru.AddNewPath(path);
					break;
				}
			}
			using (var dlg = new OpenAndCreateCollectionDialog(mru))
			{
				dlg.ShowDialog();
			}
		}

	}
}
