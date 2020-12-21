import json
import xml.etree.ElementTree as ET

from pathlib import Path

if __name__ == "__main__":
    xml_folder = Path("./TextAsset")
    langs = [
        "BP",
        "DE",
        "EN",
        "ES",
        "FR",
        "IT",
        "JA",
        "JP",
        "KO",
        "PT",
        "RU",
        "SC",
        "ZH",
    ]

    result = {l: {} for l in langs}
    for file in xml_folder.iterdir():
        lang = file.name[:2]
        if lang not in langs:
            continue
        tree = ET.parse(file)
        root = tree.getroot()
        for i in root:
            if i.text:
                result[lang][i.get("name")] = i.text
    with open("src/pages/all_text.json", "w", encoding="UTF-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
