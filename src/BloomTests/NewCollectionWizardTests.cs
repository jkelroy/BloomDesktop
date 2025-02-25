﻿using System;
using System.IO;
using System.Windows.Forms;
using Bloom.CollectionCreating;
using NUnit.Framework;

namespace BloomTests
{
	public class NewCollectionWizardTests
	{

		[Test, Ignore("by hand")]
		public void RunWithoutWelcome()
		{
			Application.EnableVisualStyles();

			using (var dlg = new NewCollectionWizard(false))
			{
				dlg.ShowDialog();
			}
		}

		[Test, Ignore("by hand")]
		public void RunWithWelcome()
		{
			Application.EnableVisualStyles();

			using (var dlg = new NewCollectionWizard(true))
			{
				dlg.ShowDialog();
			}
		}

		private string DefaultParentDirectoryForLibraries()
		{
			return Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "Bloom");
		}
	}
}
