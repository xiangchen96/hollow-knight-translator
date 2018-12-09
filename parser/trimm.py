import codecs


def get_utf8_chars(bytes_):
    string = ''
    try:
        string = bytes_.decode('utf-8')
    except Exception:
        pass
    return string


def get_lang(string):
    langs = [
        'ES', 'KO', 'IT', 'BP', 'JA', 'JP', 'PT',
        'SC', 'ZH', 'EN', 'DE', 'RU', 'FR'
    ]
    for lang in langs:
        if lang in string:
            return f'LANGUAGE: {lang}\n'
    return ''


def replace_exp(string):
    string = string.replace('&lt;page&gt;', '\t')
    string = string.replace('&lt;Page&gt;', '\t')
    string = string.replace('&#39;', "'")
    string = string.replace('&lt;br&gt;&lt;br&gt;', '\t')
    string = string.replace('&lt;br&gt;', '\t')
    string = string.replace('\r', '')  # retorno de carro
    return string


with open('resources.assets', 'rb') as f, \
     codecs.open('trimmedAssets.txt', 'w', 'utf-8') as out:
    lastLine = ''
    for line in f:
        decoded = get_utf8_chars(line)
        if '></entry>' in decoded:
            continue
        elif decoded.startswith('<entry'):
            decoded = replace_exp(decoded)
            out.write(decoded)
        elif get_utf8_chars(line[-10:-1]) == '<entries>':
            lang = get_lang(str(line))  # read as bytes
            if lang == '':
                lang = get_lang(str(lastLine))
            out.write(lang)
        lastLine = line

out.close()
f.close()
