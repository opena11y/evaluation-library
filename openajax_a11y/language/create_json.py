import sys
import os

class LangCode:

  def __init__(self, t, s, d):
    self.type        = t
    self.code        = s  # tag or subtag
    self.description = d

subtags = ""
tags = ""

subtag_info = []    
tag_info    = []    

type   = ""
subtag = ""
tag    = ""
desc   = ""

for line in open('language-subtag-registry','r'):
   parts = line.split(': ');
   if len(parts):
     if parts[0] == 'Type':
        type   = parts[1].strip()
     if parts[0] == 'Subtag':
        subtag = parts[1].strip().lower()
        subtags += subtag + ' '
     if parts[0] == 'Tag':
        tag = parts[1].strip().lower()
        tags += tag + ' '
     if parts[0] == 'Description':
        desc   = parts[1].strip().replace('"', '\\"')
     
     if len(type) and len(subtag) and len(desc):
       subtag_info.append(LangCode(type, subtag, desc))
       type   = ""
       subtag = ""
       tag = ""
       desc   = ""

     if len(type) and len(tag) and len(desc):
       tag_info.append(LangCode(type, tag, desc))
       type   = ""
       subtag = ""
       tag = ""
       desc   = ""

lang_json = open('language_codes.js', 'w')

lang_json.write('OpenAjax.a11y.LANGUAGE_CODES = OpenAjax.a11y.LANGUAGE_CODES || {\n')
lang_json.write('      subtags : "' + subtags + '",\n\n\n')
lang_json.write('         tags : "' + tags + '"\n\n\n')

# lang_json.write('  subtag_info : {\n')

       
print("\nSub Tags")
i = 0
last = len(subtag_info)
for item in subtag_info:
  i += 1
  print(str(i) + " " + item.type + " " + item.code + " " + item.description)
#  lang_json.write('    ' + item.code + ': {\n')
#  lang_json.write('      type : "' + item.type + '",\n')
#  lang_json.write('      desc : "' + item.description + '"\n')
#  if i == last:
#    lang_json.write('    }\n')
#  else :
#    lang_json.write('    },\n')

# lang_json.write('  },\n\n\n')

# lang_json.write('  tag_info : {\n')

print("\nTags")
i = 0
last = len(tag_info)
for item in tag_info:
  i += 1
  print(str(i) + " " + item.type + " " + item.code + " " + item.description)
#  lang_json.write('    ' + item.code + ': {\n')
#  lang_json.write('      type : "' + item.type + '",\n')
#  lang_json.write('      desc : "' + item.description + '"\n')
#  if i == last:
#    lang_json.write('    }\n')
#  else :
#    lang_json.write('    },\n')

# lang_json.write('  }\n')  
# lang_json.write('};\n')
  
lang_json.write('};\n')
  