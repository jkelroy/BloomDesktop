﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Bloom
{
	public class LanguageSettings
	{
		private IEnumerable<string> _preferredSourceLanguages =new List<string>();
		public string VernacularLangTag { get; set; }


		public LanguageSettings(string langTag, IEnumerable<string> preferredSourceLanguagesInOrder)
		{
			_preferredSourceLanguages = preferredSourceLanguagesInOrder;
			VernacularLangTag = langTag;
		}

		public string ChooseBestSource(Dictionary<string, string> sourceTexts, string returnIfNoneFound)
		{
			foreach (var lang in _preferredSourceLanguages)
			{
				if (sourceTexts.ContainsKey(lang))
					return sourceTexts[lang];
			}
			return returnIfNoneFound;
		}
	}
}
