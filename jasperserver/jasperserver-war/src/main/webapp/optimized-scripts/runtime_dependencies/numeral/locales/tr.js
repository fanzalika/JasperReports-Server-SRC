!function(n,i){"function"==typeof define&&define.amd?define(["../numeral"],i):i("object"==typeof module&&module.exports?require("../numeral"):n.numeral)}(this,function(n){var i={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"};n.register("locale","tr",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"bin",million:"milyon",billion:"milyar",trillion:"trilyon"},ordinal:function(n){if(0===n)return"'ıncı";var c=n%10,e=n%100-c,r=n>=100?100:null;return i[c]||i[e]||i[r]},currency:{symbol:"₺"}})});