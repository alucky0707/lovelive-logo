/*
lovelive-logo.js
version: 0.3.2
license:
Copyright (c) 2014, alucky0707
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
THE POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

var
logoTemplate = [
"                                          a$j*j                                                          +$_$*j"     ,
"                                          ;' ;'                                                           ;' ;'   ," ,
"     __________________.  __________________.  __________________.             _______.  __________________,   _1/"  ,
"    (%%%%%%%%%%%%%%%%%%/ (%%%%%%%%%%%%%%%%%%/ (%%%%%%%%%%%%%%%%%%/           (p$TOJOPX) (%%%%%%%%%%%%%%%%%%/  %%/"   ,
'    __________________.                 $%8/  ___________________           / "                        "*M/  %%/'    ,
"   ($AYASEELIHADXBIDA$/                 '$/  ($NISHIKINOMAKIMINA/ ._______,D;'                         .$/  %%/"     ,
"                   '@/                  @/                   `@/ ($NOZOMI`;N                           @/  N'/"      ,
"        ___________/'         ._______,/\"         ._________,/'         /M*'                  .______,/'  ._,"      ,
'       ($AZACSHJD*"          ($ABIACZA"*          (MIKOTORI*"          (@/                   ($AXACj*"  /%%*'        ,
''                                                                                                                    ,
'                                                  Ｓ_ｃ_ｈ_ｏ_ｏ_ｌ*    ｉ_ｄ_ｏ_ｌ*    ｐ_ｒ_ｏ_ｊ_ｅ_ｃ_ｔ)))))))' ].join('\n') + '\n';


//lovelivalize/unlovelivalize

var
pattern = combination([0,1,2,3]),
inverse = pattern.reduce(function (inverse, pat, i) {
  inverse[pat.join('')] = i;
  return inverse;
}, {});

var
setA = words('$KOSAKAHONOKAXJHDM $SAXVSONODAUMIOHIU $HOSHIZORARINNZAC$ $KOIZUMIHANAYOXAZ$'),
setB = words('Y8 ZA WA CO'),
varNames = words("a$j j $_$ _1 ___________________ M $AYASEELIHADXBIDA$ " +
                 "___________ $AZACSHJD MIKOTORI Ｓ_ｃ_ｈ_ｏ_ｏ_ｌ ｉ_ｄ_ｏ_ｌ");

function lovelivalize(source, standalone) {
  var
  i,
  lovelived = standalone ? standaloneHeader : "require('lovelive-logo');\n\n",
  chars = encodeURIComponent(source).match(/[-a-zA-Z0-9_.!~*'()]|%[0-9a-fA-F]{2}/g)||[], len = chars.length,
  c, a, b;
  
  for (i = 0; i < len; i++) {
    if (chars[i].length === 1) {
      c = chars[i].charCodeAt(0);
    } else {
      c = parseInt(chars[i].slice(1), 16);
    }
    
    a = pattern[~~(c / 24)].slice(0);
    b = pattern[c % 24].slice(0);
    
    lovelived += logoTemplate.replace(/%{18}/g, function () {
      return setA[a.shift()];
    }).replace(/%{2}/g, function () {
      return setB[b.shift()];
    }) + '\n';
  }
  
  return standalone ? lovelived + standaloneFooter : lovelived;
}

var
unlovelivalizeSource = [
'function unlovelivalize(lovelived){'                             ,
  'var '                                                          ,
  'encoded=lovelived.map(function(xs){'                           ,
    'var '                                                        ,
    'c = (inverse[xs[0]]*24+inverse[xs[1]]).toString(16);'         ,
    'return ("00" + c).slice(-2);'                                ,
  "}).join('%');"                                                 ,
  "return encoded.length===0?'':decodeURIComponent('%'+encoded);" ,
'}'                                                               ].join('');

//global setup

var
globalSetupSource = [
'var '                                                       ,
'inverse=' + JSON.stringify(inverse) + ','                   ,
'setA=' + JSON.stringify(setA) + ','                         ,
'setB=' + JSON.stringify(setB) + ','                         ,
'varNames=' + JSON.stringify(varNames) + ';'                 ,
''                                                           ,
'var '                                                       ,
'as=[],'                                                     ,
'bs=[],'                                                     ,
'lovelived=[];'                                              ,
''                                                           ,
'setA.forEach(function(a, i){'                               ,
  'global.__defineGetter__(a,function(){'                    ,
    'as.push(i);'                                            ,
    'return 1;'                                              ,
  '});'                                                      ,
'});'                                                        ,
''                                                           ,
'setB.forEach(function (b,i){'                               ,
  'global.__defineGetter__(b,function(){'                    ,
    'bs.push(i);'                                            ,
    'return 1;'                                              ,
  '});'                                                      ,
'});'                                                        ,
''                                                           ,
"global.__defineGetter__('ｐ_ｒ_ｏ_ｊ_ｅ_ｃ_ｔ',function(){" ,
  "lovelived.push([as.join(''), bs.join('')]);"              ,
  'as=[];bs=[];'                                             ,
  'return 1;'                                                ,
'});'                                                        ,
''                                                           ,
'varNames.forEach(function(v){global[v]=1;});'               ,
''                                                           ,
'global.p$TOJOPX=function(){return 1;};'                     ,
'global.__________________={__________________:'             ,
  '{__________________:'                                     ,
    '{_______:'                                              ,
      '{__________________:1}}}};'                           ,
''                                                           ,
'setTimeout(function(){'                                     ,
  'Function(unlovelivalize(lovelived))();'                   ,
'},0);'                                                      ].join('');

//lovelived header/footer

var
standaloneHeader = [
'~function start(lovelive) {\n\n' ,
''                                ,
'with (lovelive) {\n'             ].join(''),

standaloneFooter = [
'}}(function(global){' ,
  globalSetupSource    ,
  unlovelivalizeSource ,
  'return global;'     ,
'}({}))'               ].join('');

//utils

function combination(xs) {
  var
  comb = [],
  x,
  len = xs.length, i, j;
  
  for (i = 0; i < len; i++) {
    x = xs.shift();
    comb.push.apply(comb, combination(xs).map(function (c) {c.unshift(x);return c;}));
    xs.push(x);
  }
  
  return comb.length === 0 ? [[]] : comb;
}

function words(str) {
  return str.split(' ');
}

//exports

exports.lovelivalize = lovelivalize;
exports.VERSION = '0.3.2';

//launch if node.js

if (global.process) {
  new Function([
    globalSetupSource    ,
    unlovelivalizeSource ].join(''))();
}
