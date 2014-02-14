/*
lovelive-logo.js
version: 0.1.0
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
Buffer = require('buffer').Buffer;

var
pattern = combination([0,1,2,3]),
inverse = pattern.reduce(function (inverse, pat, i) {
  inverse[pat.join('')] = i;
  return inverse;
}, {});

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

var
base = function () {/*
                                          a$j*j                                                          +$_$*j
                                          ;' ;'                                                           ;' ;'   ,
     __________________.  __________________.  __________________.             _______.  __________________,   _1/
    (%%%%%%%%%%%%%%%%%%/ (%%%%%%%%%%%%%%%%%%/ (%%%%%%%%%%%%%%%%%%/           (p$TOJOPX) (%%%%%%%%%%%%%%%%%%/  %%/
    __________________.                 $%8/  ___________________           / "                        "*M/  %%/
   ($AYASEELIHADXBIDA$/                 '$/  ($NISHIKINOMAKIMINA/ ._______,D;'                         .$/  %%/
                   '@/                  @/                   `@/ ($NOZOMI`;N                           @/  N'/
        ___________/'         ._______,/"         ._________,/'         /M*'                  .______,/'  ._,
       ($AZACSHJD*"          ($ABIACZA"*          (MIKOTORI*"          (@/                   ($AXACj*"  /%%*

                                                  Ｓ_ｃ_ｈ_ｏ_ｏ_ｌ*    ｉ_ｄ_ｏ_ｌ*    ｐ_ｒ_ｏ_ｊ_ｅ_ｃ_ｔ)))))))

*/}.toString().split('\n').slice(1,-1).join('\n'),
setA = ["$KOSAKAHONOKAXJHDM", "$SAXVSONODAUMIOHIU", "$HOSHIZORARINNZAC$", "$KOIZUMIHANAYOXAZ$"],
setB = ["Y8", "ZA", "WA", "CO"];

function lovelivalize(source) {
  var
  i,
  lovelived = "require('lovelive-logo');\n\n",      
  buf = new Buffer(source, 'utf8'), len = buf.length,
  x, y;
  for (i = 0; i < len; i++) {
    x = pattern[~~(buf[i] / 24)].slice(0);
    y = pattern[buf[i] % 24].slice(0);
    lovelived += base.replace(/%{18}/g, function () {
      return setA[x.shift()];
    }).replace(/%{2}/g, function () {
      return setB[y.shift()];
    }) + '\n';
  }
  
  return lovelived;
}

function unlovelivalize(lovelived) {
  return new Buffer(lovelived.map(function (xs) {
    return inverse[xs[0]] * 24 + inverse[xs[1]];
  })).toString();
}

var
as = [],
bs = [],
lovelived = [];

setA.forEach(function (a, i) {
  global.__defineGetter__(a, function () {
    as.push(i);
    return 1;
  });
});

setB.forEach(function (b, i) {
  global.__defineGetter__(b, function () {
    bs.push(i);
    return 1;
  });
});

global.__defineGetter__('ｐ_ｒ_ｏ_ｊ_ｅ_ｃ_ｔ', function () {
  lovelived.push([as.join(''), bs.join('')]);
  as = []; bs = [];
  return 1;
});

("a$j j $_$ _1 ___________________ M $AYASEELIHADXBIDA$ " +
"___________ $AZACSHJD MIKOTORI " +
"Ｓ_ｃ_ｈ_ｏ_ｏ_ｌ ｉ_ｄ_ｏ_ｌ").split(' ').forEach(function (v) { global[v] = 1; });

global.p$TOJOPX = function () { return 1; };
global.__________________ = {__________________: {__________________: {_______: {__________________: 1}}}};

var
setImmediate = global.setImmediate;

if (typeof setImmediate === 'undefined') {
  setImmediate = function (fn) {
    setTimeout(fn, 0);
  };
}

function runLovelive() {
  Function(unlovelivalize(lovelived))();
  lovelived = [];
}

setImmediate(runLovelive);

exports.lovelivalize = lovelivalize;
exports.unlovelivalize = unlovelivalize;
exports.runLovelive = runLovelive;
