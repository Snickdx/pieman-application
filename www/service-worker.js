/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/css/ionic.app.css","e07c9e1bb97e1a942a2f8e1939113bce"],["/fonts/roboto/css/fonts.css","d7fe8f22cf3f518ce44f315d27f13661"],["/fonts/roboto/fonts/Roboto-100/Roboto-100.ttf","b0ea79ecda11ad2dabfdda928db2b561"],["/fonts/roboto/fonts/Roboto-100/Roboto-100.woff","58af682d7075bb3510bd041dc8d81706"],["/fonts/roboto/fonts/Roboto-100italic/Roboto-100italic.ttf","e9251dd73aba0509a9bb08bad024db88"],["/fonts/roboto/fonts/Roboto-100italic/Roboto-100italic.woff","36d9e3482400f071d5202885be19ee3f"],["/fonts/roboto/fonts/Roboto-300/Roboto-300.ttf","634f53eb79efa455a9e9d85d608b3447"],["/fonts/roboto/fonts/Roboto-300/Roboto-300.woff","7e2d32e7141050d758a38b4ec96390c0"],["/fonts/roboto/fonts/Roboto-300italic/Roboto-300italic.ttf","1aeedeee0b68884bb34f67a9b3aa76e4"],["/fonts/roboto/fonts/Roboto-300italic/Roboto-300italic.woff","f7f58963e077aaac2476e70ec59ad5be"],["/fonts/roboto/fonts/Roboto-500/Roboto-500.ttf","88f29ea5a372d06f521395134f62ab91"],["/fonts/roboto/fonts/Roboto-500/Roboto-500.woff","0f3b7101a8adc1afe1fbe89775553c32"],["/fonts/roboto/fonts/Roboto-500italic/Roboto-500italic.ttf","b07f691c8304374ab2943cfa1f57d6ed"],["/fonts/roboto/fonts/Roboto-500italic/Roboto-500italic.woff","6fe015419c76da07261300175b1e66d2"],["/fonts/roboto/fonts/Roboto-700/Roboto-700.ttf","ad97d029a11d8b39692037e753d23d1f"],["/fonts/roboto/fonts/Roboto-700/Roboto-700.woff","43183beef21370d8a4b0d64152287eba"],["/fonts/roboto/fonts/Roboto-700italic/Roboto-700italic.ttf","bcfeb9890c11d57f4ebaf5150cd99638"],["/fonts/roboto/fonts/Roboto-700italic/Roboto-700italic.woff","7e3bdb1d31e946199e866262423df9c8"],["/fonts/roboto/fonts/Roboto-900/Roboto-900.ttf","1b72bcbf48ca1ef9e98dccadc4514a92"],["/fonts/roboto/fonts/Roboto-900/Roboto-900.woff","72808932cb03c3e9ace8ba45ff6d9cd4"],["/fonts/roboto/fonts/Roboto-900italic/Roboto-900italic.ttf","862f5eff1ecb4f38d770782bf9e51f81"],["/fonts/roboto/fonts/Roboto-900italic/Roboto-900italic.woff","aa60fa9ca068990c94ad6a4c7c2ebe1d"],["/fonts/roboto/fonts/Roboto-italic/Roboto-italic.ttf","31fc50b4c526d006bf3333b5c04eefaa"],["/fonts/roboto/fonts/Roboto-italic/Roboto-italic.woff","7f839b4cd334882c4729a56e5ec87bf0"],["/fonts/roboto/fonts/Roboto-regular/Roboto-regular.ttf","38861cba61c66739c1452c3a71e39852"],["/fonts/roboto/fonts/Roboto-regular/Roboto-regular.woff","f94d5e5102359961c44a1da1b58d37c9"],["/img/pieman-128.png","005376b904fec5688309522f50208054"],["/img/pieman.png","31a7c397ad6f9bdbc85923ff5b0f2c49"],["/index.html","9eb0a682586b86ad85e8c9f1efb3d1d8"],["/js/app.js","540fb31224a941cbf0fe612c9cb364ae"],["/js/controllers.js","daa7153f90cc63498203e04fbe9f2d59"],["/js/directives.js","ab4e4d9e8c215ac1add8b79960c12044"],["/js/routes.js","f33b9b0a28a9d14ae9d88ad2c95de2e4"],["/js/services.js","c0fc16f68f57c84c0e4806afdcbe56e0"],["/lib/angular-animate/angular-animate.js","9385b61d5fbebd5b25ab313def614381"],["/lib/angular-animate/angular-animate.min.js","71a13fcafc6dd1842745494a3cf43962"],["/lib/angular-animate/index.js","1bcc4e661ab8ddc751d1a9a8942b370b"],["/lib/angular-nvd3/Gruntfile.js","02087bc1bcd93af86c0c6ed071730d68"],["/lib/angular-nvd3/dist/angular-nvd3.js","40de33dd7dde13ec296cd60d0adff616"],["/lib/angular-nvd3/dist/angular-nvd3.min.js","802bc73af1df3409c673efbd7721ed36"],["/lib/angular-nvd3/index.js","1f6d46c89921d27b3f44d198cb60484b"],["/lib/angular-sanitize/angular-sanitize.js","305a6f71693bdf21e21cd09f24b2c4d6"],["/lib/angular-sanitize/angular-sanitize.min.js","9f8ca450f716142c9a06790953fb2532"],["/lib/angular-sanitize/index.js","349b703c665246d4f1919931c6c3fb54"],["/lib/angular-ui-router/release/angular-ui-router.js","749a18f80f375e3049975f190a7bfc4e"],["/lib/angular-ui-router/release/angular-ui-router.min.js","04c594b762aba521277ee747b28745d5"],["/lib/angular-ui-router/src/common.js","7cef018108cb4f4571f22b00d9324b82"],["/lib/angular-ui-router/src/resolve.js","8b3e76a8e9242408f366a840cd202105"],["/lib/angular-ui-router/src/state.js","3de988c7a35995b2c910258776d8d086"],["/lib/angular-ui-router/src/stateDirectives.js","9827d4eb264a7fb3d05f1b910b1391f3"],["/lib/angular-ui-router/src/stateFilters.js","84bba4f51e00086d8fe2f93fa1efbf15"],["/lib/angular-ui-router/src/templateFactory.js","8299e97e32fcfd3cc983df3085cc1369"],["/lib/angular-ui-router/src/urlMatcherFactory.js","f93993b00aa676ee329141ef294488e6"],["/lib/angular-ui-router/src/urlRouter.js","34193659b7b21f4f451f20a2878c00c0"],["/lib/angular-ui-router/src/view.js","64214a63924fc3eb6588ed7726485d2b"],["/lib/angular-ui-router/src/viewDirective.js","83174466bc2791816e67939b0243ed28"],["/lib/angular-ui-router/src/viewScroll.js","a899f6b7b01fe905406c4373a0603a23"],["/lib/angular/angular-csp.css","3c6496d2475bec5850eec95eb066944a"],["/lib/angular/angular.js","28c75087388cf69bbaabd3a954d73138"],["/lib/angular/angular.min.js","9a495e66b349fd238c80c7446529be1f"],["/lib/angular/index.js","4a6b945464e73d96c4eddaff73a45417"],["/lib/angularfire/dist/angularfire.js","59dfd84ab0ceaea681efe4639ce065f1"],["/lib/angularfire/dist/angularfire.min.js","3eb51d0062f88dde96598375e2db2a08"],["/lib/d3/d3.js","af181029476539b7f3ec8e63f21feb3a"],["/lib/d3/d3.min.js","8da8f16a051fe0b34d9ca10f4a21838f"],["/lib/firebase/firebase.js","41acac24ee962ad3324a2859469eb99f"],["/lib/ionic-toast/dist/ionic-toast.bundle.min.js","3cbf455189b4a41376ee15affa556c38"],["/lib/ionic-toast/gulpfile.js","e0552317e1936013000d23a8502c5e0b"],["/lib/ionic-toast/src/ionic-toast.css","830824d80948cdb1a6aa8b97a06e3b77"],["/lib/ionic-toast/src/ionic-toast.module.js","573bfd52f975e0282a605d2d51f162ef"],["/lib/ionic-toast/src/ionic-toast.provider.js","bc14d4a02316376bb0a490ca72d35b3b"],["/lib/ionic-toast/src/ionic-toast.run.js","4dcebce16e166fe0363f9ac771882859"],["/lib/ionic/css/ionic.css","169725e0bb0f1b3a3780a38358815836"],["/lib/ionic/css/ionic.min.css","49f66e19303768d9ea65179deefe394b"],["/lib/ionic/fonts/ionicons.eot","2c2ae068be3b089e0a5b59abb1831550"],["/lib/ionic/fonts/ionicons.svg","c037dbbc0e6790f30e824a50010df5fb"],["/lib/ionic/fonts/ionicons.ttf","24712f6c47821394fba7942fbb52c3b2"],["/lib/ionic/fonts/ionicons.woff","05acfdb568b3df49ad31355b19495d4a"],["/lib/ionic/js/ionic-angular.js","b7250cf58b3e0f81bef21ffddb424523"],["/lib/ionic/js/ionic-angular.min.js","b95298e98c5acbcaef4bf36ad85f5ef7"],["/lib/ionic/js/ionic.bundle.min.js","34f01b72689414a224badd9089566158"],["/lib/ionic/js/ionic.js","bd36363bef2c9880bdadc12ad2cfc42c"],["/lib/ionic/js/ionic.min.js","a8c2d723002b87647bc67c088c9600a5"],["/lib/ionicuirouter/ionicUIRouter.js","41d24b938abb2959325a963b956e3f39"],["/lib/moment/locale/af.js","77ccc8ca64c5fcb10f0b8259622e43d4"],["/lib/moment/locale/ar-ma.js","3df19373f1094fa10b415697f5468f5d"],["/lib/moment/locale/ar-sa.js","d2224b4a366602e1b9f54e71b520c82c"],["/lib/moment/locale/ar-tn.js","dc58763b4a596e6fa508ade76264318d"],["/lib/moment/locale/ar.js","7acc90f01a5c17849fea801ac6ce4f1e"],["/lib/moment/locale/az.js","7a7313ee483116c17ecae355263857cf"],["/lib/moment/locale/be.js","97e8e1f1dfa17d0b4023d78437ec1b7f"],["/lib/moment/locale/bg.js","f539abe8b4ef974c001c090d7083d63d"],["/lib/moment/locale/bn.js","690ba4a0c2bdb83a79ec5d86646b4ed1"],["/lib/moment/locale/bo.js","82b2fcb4e79bbd01a706dad5ba05873f"],["/lib/moment/locale/br.js","4afb2c2eadf16d9e126c7bd846525300"],["/lib/moment/locale/bs.js","b8b6c01fbf115b3404c1a5234787e60e"],["/lib/moment/locale/ca.js","d9e172ab4d1a38010b242b3c339780e6"],["/lib/moment/locale/cs.js","20e106a553769f9a77f25a6f3885de18"],["/lib/moment/locale/cv.js","cd2955b7bcb9af4f4d3736e30c6ff8a9"],["/lib/moment/locale/cy.js","ea018ad144334dcfd1626c5c65edaab2"],["/lib/moment/locale/da.js","4d1b4c5f62114447ac17ad64cccc9dd0"],["/lib/moment/locale/de-at.js","f22b3d96469595572be9fda941cc634f"],["/lib/moment/locale/de.js","30cb3c2082d9db2a11304c0af43d0a22"],["/lib/moment/locale/dv.js","65d6351e6a46730dba342fd4690c1e37"],["/lib/moment/locale/el.js","1b5b0817042ed64aa6ff7370ca7f9020"],["/lib/moment/locale/en-au.js","b7e77981d80bd6569c574c363c147db6"],["/lib/moment/locale/en-ca.js","ec1c5f74977a7c4b2ed253b53dc7150d"],["/lib/moment/locale/en-gb.js","61de60129729b64683d600a8427c9c1a"],["/lib/moment/locale/en-ie.js","bd244be685d576f7837ee01e1747f5d9"],["/lib/moment/locale/en-nz.js","6dc2260ab8ec56d4bd05e057b314bc74"],["/lib/moment/locale/eo.js","11454bee42bfa9cee3e6a265d73feb84"],["/lib/moment/locale/es-do.js","08768794c61b2e0b193d01d4519975f8"],["/lib/moment/locale/es.js","db227ccc74d482b1c02665e447b55f78"],["/lib/moment/locale/et.js","de9e8e237e329cafb05f8bf8e052228c"],["/lib/moment/locale/eu.js","01f2c9d7da679b1cdec56b1b8b951b1a"],["/lib/moment/locale/fa.js","bf21a7700069c5ff31690f7dd93efe90"],["/lib/moment/locale/fi.js","173db61d78b1235ef873e478a1265b5e"],["/lib/moment/locale/fo.js","2dbe70f93a3520ea61bfb46a502b7159"],["/lib/moment/locale/fr-ca.js","0906eb2acf99d5c8b94b30ea524db68f"],["/lib/moment/locale/fr-ch.js","636d2fa71ae16cc45551533708af064d"],["/lib/moment/locale/fr.js","08aef62b860f2ccdfb54f313b379cfff"],["/lib/moment/locale/fy.js","0d04de467e34b82cd69a545b22df4f19"],["/lib/moment/locale/gd.js","b0d3fed8b43b8a459fe4b625065c56bf"],["/lib/moment/locale/gl.js","362d4e55cb167c89917b3f46e02533aa"],["/lib/moment/locale/he.js","99c3c88db6d389ba3b6218bfd7c98e36"],["/lib/moment/locale/hi.js","0d5e3969b9fa1c29dcf0c8d68247c46b"],["/lib/moment/locale/hr.js","aa47947a96da9b2895201fd1c2edb417"],["/lib/moment/locale/hu.js","9bc142574c3155153326fe30382100ea"],["/lib/moment/locale/hy-am.js","8e39aa6747202bfd3529c856ff4de392"],["/lib/moment/locale/id.js","8c113d3cf14c466ae9c11e71792a82a8"],["/lib/moment/locale/is.js","744f5b9f5374c986409c2f358a5ac1cd"],["/lib/moment/locale/it.js","1082a9e194bac05eaa6fabd1d4e11fba"],["/lib/moment/locale/ja.js","44e12bce68d696b1cef769ed9d4c6730"],["/lib/moment/locale/jv.js","b9de2ea95a7f248b5090a1a874fa4750"],["/lib/moment/locale/ka.js","e67c1a366b342489234ff2c0f68018a8"],["/lib/moment/locale/kk.js","6e19cb4afffc207d9f701ff2854ee152"],["/lib/moment/locale/km.js","cf16718fd6206e1afce244efefe8d2c1"],["/lib/moment/locale/ko.js","05b558c5f23fbee932b31ba529a799fe"],["/lib/moment/locale/ky.js","0bdfeb0e8d4d155f6143531782fcc909"],["/lib/moment/locale/lb.js","1ea41c03ca377f5e2bab9b00a0328798"],["/lib/moment/locale/lo.js","025d9fef9ffe0ae81346fef06a3056f3"],["/lib/moment/locale/lt.js","ef6e60121e86e288dfe330f34b4b4e96"],["/lib/moment/locale/lv.js","3f91c665d9176a4914077e6bbc783a59"],["/lib/moment/locale/me.js","f1ee6b5b414f4e947ab368f38193814a"],["/lib/moment/locale/mk.js","7083190d0fd1b0ca5403cfc3397e5084"],["/lib/moment/locale/ml.js","436a8a407e20f0a98b05c4d703d67bf7"],["/lib/moment/locale/mr.js","b28e554a2bc24603848acbca14261329"],["/lib/moment/locale/ms-my.js","59f2577d55bd02851ea933a3bac43227"],["/lib/moment/locale/ms.js","137c3660ba5c4d0d6f36c52b0c7ab376"],["/lib/moment/locale/my.js","e8a3473c5f80d55455e0651b66b775a8"],["/lib/moment/locale/nb.js","36209dacaa405633c358447344c95466"],["/lib/moment/locale/ne.js","7eb113ed75e329391876de1883f11e6a"],["/lib/moment/locale/nl.js","478a8adcdf12d814900e9b78d307be53"],["/lib/moment/locale/nn.js","2791fa9c0d54454282f3c3b217519ecf"],["/lib/moment/locale/pa-in.js","5073d4389758789a288d3f00162515ed"],["/lib/moment/locale/pl.js","17e40f25b5e2dd9c7c4f2d5f3ac09844"],["/lib/moment/locale/pt-br.js","23e478a4e9f4e8058cee9a096c2c3f1b"],["/lib/moment/locale/pt.js","dd14191659f57601a082253210145448"],["/lib/moment/locale/ro.js","6a7cd486112d42975c6fa8d4d7046579"],["/lib/moment/locale/ru.js","f109c77bd2ce3c3c740e73cc839f11f5"],["/lib/moment/locale/se.js","54c10e9a29dfa41e66a1955aef482b09"],["/lib/moment/locale/si.js","7cc354111a4ac29c603e0c0639083d0e"],["/lib/moment/locale/sk.js","dfa39f54d5833c56dab7b8594a5af533"],["/lib/moment/locale/sl.js","53e0badb321f76a921a15255f5ecd66b"],["/lib/moment/locale/sq.js","bc4a4939990b4ec7ff4b796301f9f44a"],["/lib/moment/locale/sr-cyrl.js","b8dbdaa2189895c5dedae8771761de72"],["/lib/moment/locale/sr.js","d0719b4839d801930032d2e399fe6924"],["/lib/moment/locale/ss.js","4cf121356e98faf22466dde50ca7d117"],["/lib/moment/locale/sv.js","c3c1e8cd7965aba630d5755f9a405270"],["/lib/moment/locale/sw.js","084ffd7ff1c8147c8f6b0354f0a6a073"],["/lib/moment/locale/ta.js","ceb6974f8fcc13ebfd05b474aaa04cc8"],["/lib/moment/locale/te.js","749e9467d85beeeece02ab77d95eb735"],["/lib/moment/locale/th.js","d7eb7df79ed569815a6f08ed2ef54459"],["/lib/moment/locale/tl-ph.js","8af840e51daa492e520916b617cfe302"],["/lib/moment/locale/tlh.js","05f3163168d681ffcb8c952499b2d3ba"],["/lib/moment/locale/tr.js","46fc2b207ccc8b50a0e927feb3cd8baa"],["/lib/moment/locale/tzl.js","e45dfef4cdc97b7e7aefa5c0dee9d913"],["/lib/moment/locale/tzm-latn.js","b475b244784f4229c061566b2354be76"],["/lib/moment/locale/tzm.js","01fa9c404e1d9c8094560984dff82502"],["/lib/moment/locale/uk.js","412255de6ccb043d5c0ad7c19b425392"],["/lib/moment/locale/uz.js","6b0626eb6ea7caee179c388efdc24844"],["/lib/moment/locale/vi.js","c31ccd2106f05aabeb3310b3a048c49e"],["/lib/moment/locale/x-pseudo.js","378385b7601522f09ac8a86c5f793dfc"],["/lib/moment/locale/zh-cn.js","efe6b806cc5e37f70e53fc59590d486d"],["/lib/moment/locale/zh-tw.js","edcab6de91c1d28df11d50afc3bcf3d9"],["/lib/moment/min/locales.js","95e4f965248a611a47ad1a44d5bbb0ff"],["/lib/moment/min/locales.min.js","b926d03a455efa84e177ffcc1d8a049c"],["/lib/moment/min/moment-with-locales.js","6c77931d1148de108c79d0397b060644"],["/lib/moment/min/moment-with-locales.min.js","29a4f181422fa82fa91949c0cd3a5bae"],["/lib/moment/min/moment.min.js","af7d1a35141217d3346fd0f04e1c2172"],["/lib/moment/moment.js","dd835dad6e1de1fa2fb40e82a1245d1d"],["/lib/moment/src/lib/create/check-overflow.js","1ef1095f0bb0783c744f1709e0df49e7"],["/lib/moment/src/lib/create/date-from-array.js","0451c3934affe9c45b8b2ec00bb2189b"],["/lib/moment/src/lib/create/from-anything.js","960a5a91c76122d76bb758e6925ce048"],["/lib/moment/src/lib/create/from-array.js","23725a7c7711f697bcfe1c0e55c26722"],["/lib/moment/src/lib/create/from-object.js","5cce65bec85d01585964ee2e5dd0dd50"],["/lib/moment/src/lib/create/from-string-and-array.js","4566dd9571fec43aca64984b2d910c20"],["/lib/moment/src/lib/create/from-string-and-format.js","9df6db5a65b1149a28cc21dedfbdab94"],["/lib/moment/src/lib/create/from-string.js","3c1b934bdcaffe22373de183749166dc"],["/lib/moment/src/lib/create/local.js","d205d17e7cab58b598ee81fdf76a73cb"],["/lib/moment/src/lib/create/parsing-flags.js","c52bc622bb8d3b493219022ba2297790"],["/lib/moment/src/lib/create/utc.js","294f3e080cd0abd178f095e1a8856b0e"],["/lib/moment/src/lib/create/valid.js","d55819a588069b3bd22c9ffbf1953e97"],["/lib/moment/src/lib/duration/abs.js","2668269aed82946dce80b3df522189f3"],["/lib/moment/src/lib/duration/add-subtract.js","667e7ec5d10237369cdab31c04614206"],["/lib/moment/src/lib/duration/as.js","379e2a18940a37fffb8b6896e6cec2a1"],["/lib/moment/src/lib/duration/bubble.js","40e90c9226980e783f8ca8e0400309eb"],["/lib/moment/src/lib/duration/constructor.js","8be993d258c2d61a509146ae9b551e58"],["/lib/moment/src/lib/duration/create.js","346d7bfab862636aff74d6a81fd359b9"],["/lib/moment/src/lib/duration/duration.js","5f93fe8caa8457f4a522d5f030dcdd8d"],["/lib/moment/src/lib/duration/get.js","60a44bffff2eb0c3d3de7625725486ce"],["/lib/moment/src/lib/duration/humanize.js","697bf8ea9f7454e6ab5a0abd9a9547c1"],["/lib/moment/src/lib/duration/iso-string.js","0f31d7917272f4903cee3555410f9094"],["/lib/moment/src/lib/duration/prototype.js","5433d4e1c7cf8a13cabd40e990489d87"],["/lib/moment/src/lib/format/format.js","de94f3c2f35f0d374e24bbef5bfce366"],["/lib/moment/src/lib/locale/base-config.js","da5a6d7498cff0dffff3d29a798696f7"],["/lib/moment/src/lib/locale/calendar.js","e3e70d88ef2ada6cd239294d57ccefe5"],["/lib/moment/src/lib/locale/constructor.js","ada98e28f6accd4f339bd1f2e31822d4"],["/lib/moment/src/lib/locale/en.js","6880152c9b39a2ca4ca2311459b00b63"],["/lib/moment/src/lib/locale/formats.js","3fbadf7baaac737cd4189b4c49cc6c0c"],["/lib/moment/src/lib/locale/invalid.js","81eed57e53c594b892f8363815545921"],["/lib/moment/src/lib/locale/lists.js","f1be6f340152ffc8db9e752a1886d266"],["/lib/moment/src/lib/locale/locale.js","a8404c947fef546256e39c6cf6de5823"],["/lib/moment/src/lib/locale/locales.js","a476a43c223bf5bf2023d172a4f2bdec"],["/lib/moment/src/lib/locale/ordinal.js","ba3d308ddd5436ef5497a5a9c4a6f4d1"],["/lib/moment/src/lib/locale/pre-post-format.js","300ea425b5913f00cfb2232b0945b1c7"],["/lib/moment/src/lib/locale/prototype.js","8c105ee32c265cd2cb2f6091ac7fc243"],["/lib/moment/src/lib/locale/relative.js","e34ea8fdbe1f0fe5e084284f0cce03d3"],["/lib/moment/src/lib/locale/set.js","6ad927243121d0b15b4d32de5390b5c5"],["/lib/moment/src/lib/moment/add-subtract.js","b39daca00b6a2c206f3cf5d9af50d836"],["/lib/moment/src/lib/moment/calendar.js","0df42411e507cc151a3eda1b5b7cfb21"],["/lib/moment/src/lib/moment/clone.js","5e59c6bf0cf6ec635bab9fd426c2ce07"],["/lib/moment/src/lib/moment/compare.js","0884b29e27a661dd8bb57d422a24c879"],["/lib/moment/src/lib/moment/constructor.js","602ef0963421deef41f0c7215f38dec3"],["/lib/moment/src/lib/moment/creation-data.js","a491add6d87eff10e5eb3f8f712bd5bd"],["/lib/moment/src/lib/moment/diff.js","122755c06c4aa3fcc3d3d82b89c58605"],["/lib/moment/src/lib/moment/format.js","bfb9254b37d0b091d7b1e02ead228e42"],["/lib/moment/src/lib/moment/from.js","870b60b61c8e5838e04d30eea330d4ee"],["/lib/moment/src/lib/moment/get-set.js","d5fc47247465f6add31791764223d136"],["/lib/moment/src/lib/moment/locale.js","0faeeb8a015434353c2f6b91db196d0f"],["/lib/moment/src/lib/moment/min-max.js","f8d5c0855a3952cee512027a261427c7"],["/lib/moment/src/lib/moment/moment.js","4ff1052b218ca941b630274dd5d85129"],["/lib/moment/src/lib/moment/now.js","315e302d6898990836a25aeead0ef685"],["/lib/moment/src/lib/moment/prototype.js","0519272b1ac04f79aeab5c25018dca04"],["/lib/moment/src/lib/moment/start-end-of.js","8a882b450fd06f44556c84512fd38314"],["/lib/moment/src/lib/moment/to-type.js","32687cfa1a4b81d496e0d471375358fa"],["/lib/moment/src/lib/moment/to.js","02676efeb5f05fb248146931f3f8f2ab"],["/lib/moment/src/lib/moment/valid.js","b9d4b5c7b982dd99973571aa0e13dd08"],["/lib/moment/src/lib/parse/regex.js","1ad4bdd69f77a44a562517121842a568"],["/lib/moment/src/lib/parse/token.js","1bb31e534395c65e1db0b54cf3e23710"],["/lib/moment/src/lib/units/aliases.js","072f67770f7831816321e1a34013e34b"],["/lib/moment/src/lib/units/constants.js","f41149380c7a217d8025a0261a648561"],["/lib/moment/src/lib/units/day-of-month.js","9c65ac0dca7f19253e518c80b41a62b6"],["/lib/moment/src/lib/units/day-of-week.js","873e9e946612c4280a481c55964e1fb3"],["/lib/moment/src/lib/units/day-of-year.js","f35e3fe09f0a342f3885b3d06dafccc7"],["/lib/moment/src/lib/units/hour.js","456a6d28c81669d8affc0b27b348f165"],["/lib/moment/src/lib/units/millisecond.js","78da3d92f262a83055baa952fcb0f27a"],["/lib/moment/src/lib/units/minute.js","57197566f34400c3f765a43560745a34"],["/lib/moment/src/lib/units/month.js","7449b59f99950c6fc1e8b8def484b6ae"],["/lib/moment/src/lib/units/offset.js","a2c51394348ef04f54bbe8b77426dc02"],["/lib/moment/src/lib/units/priorities.js","7f82472991e91fba259385a95ddf6771"],["/lib/moment/src/lib/units/quarter.js","4a17b3218fb9795b4ec8e8b4173eda07"],["/lib/moment/src/lib/units/second.js","b1b89ade36816a3076af12369bc73d87"],["/lib/moment/src/lib/units/timestamp.js","934113a8e1bca6518af18e16674d0840"],["/lib/moment/src/lib/units/timezone.js","64a3130bd75647e91fe0fe46ee1cd034"],["/lib/moment/src/lib/units/units.js","47bfe1937215bbb4de700b27e50c6747"],["/lib/moment/src/lib/units/week-calendar-utils.js","4fccab6471f8e0719846e9fe5e7f5065"],["/lib/moment/src/lib/units/week-year.js","63ac91f57e2d3d19a40c129356182153"],["/lib/moment/src/lib/units/week.js","86b9fe867832f1852c63fcbc4d269207"],["/lib/moment/src/lib/units/year.js","dd80d6eee2b0e39ead46d545ea537692"],["/lib/moment/src/lib/utils/abs-ceil.js","4b9466afd05e0eb55740699af935de6b"],["/lib/moment/src/lib/utils/abs-floor.js","3f3752f4dbc9f9d103c5130fc964a676"],["/lib/moment/src/lib/utils/abs-round.js","81a7c7c9865ef89509fbb5617a996097"],["/lib/moment/src/lib/utils/compare-arrays.js","48630cb3b307e8206e698ae8c295a3cf"],["/lib/moment/src/lib/utils/defaults.js","04d951d603ca13e4ace1201f58d7bdb8"],["/lib/moment/src/lib/utils/deprecate.js","202ee64244db908beb28b4d358e957fd"],["/lib/moment/src/lib/utils/extend.js","1ea73295de4c983473826fef88f796b4"],["/lib/moment/src/lib/utils/has-own-prop.js","1bed4bfdd69df78dccbffc3c6e7da79f"],["/lib/moment/src/lib/utils/hooks.js","1615d1cc924003988f6588d4ec0a0fc3"],["/lib/moment/src/lib/utils/index-of.js","71d14c6e5fa79f48c33827f7b6e385ee"],["/lib/moment/src/lib/utils/is-array.js","7f4882cf0361cec5461a78ca37f906d6"],["/lib/moment/src/lib/utils/is-date.js","9a823f2560e333db28a3ed3f34a591b6"],["/lib/moment/src/lib/utils/is-function.js","100574da5c805e1ee27c7a46230a9ece"],["/lib/moment/src/lib/utils/is-object-empty.js","fb2f9033ce70a7f295a592b4913bb756"],["/lib/moment/src/lib/utils/is-object.js","007aa151aba94a3e983c31c7fa5f0a87"],["/lib/moment/src/lib/utils/is-undefined.js","e3de3806869cc2bef8cfa39183a018f2"],["/lib/moment/src/lib/utils/keys.js","d6a5ad574b323dcb5503a45e8e1f7067"],["/lib/moment/src/lib/utils/map.js","9ad52fd2895d5588c5a0c7a5fc78e705"],["/lib/moment/src/lib/utils/some.js","4a5ac4c5df2a5bb7dd835a2b8cca2874"],["/lib/moment/src/lib/utils/to-int.js","dc1e816cdf139ebe822f16ef6dd25f0d"],["/lib/moment/src/lib/utils/zero-fill.js","dabc07dc2f7c2e8e512799ae0b692b17"],["/lib/moment/src/locale/af.js","35033834f213d49686b520870052ffa9"],["/lib/moment/src/locale/ar-ma.js","4c1ece42b0771d8b686d2aac5977899a"],["/lib/moment/src/locale/ar-sa.js","abc18b19959bc74831756e17a8875594"],["/lib/moment/src/locale/ar-tn.js","f71495cffd798e7a6998be7e61b44ed5"],["/lib/moment/src/locale/ar.js","5c736c7cf62bec608b86da7e98fcb951"],["/lib/moment/src/locale/az.js","dc0511aaa6ad99ce5fa4ef113e825099"],["/lib/moment/src/locale/be.js","4948619db870a3575d929ac83430d2d0"],["/lib/moment/src/locale/bg.js","9e891caaab727ac61a872cf0a09189ed"],["/lib/moment/src/locale/bn.js","3b5f569dd36923e4355721455483c881"],["/lib/moment/src/locale/bo.js","e59fe4ce1576301daed544e5748f57ce"],["/lib/moment/src/locale/br.js","9828d299614d36456ff1f0d364df8272"],["/lib/moment/src/locale/bs.js","85fdf07775ecd5961b088a7f690f6b5e"],["/lib/moment/src/locale/ca.js","2047248566ecaac7a34b8aac7d3fdd43"],["/lib/moment/src/locale/cs.js","d07f117eea5cd6e96a6b83879eab22f2"],["/lib/moment/src/locale/cv.js","9291506d2544e59306561f2509c93a3a"],["/lib/moment/src/locale/cy.js","39b255c9cc9fde916529a83ad94ea2d1"],["/lib/moment/src/locale/da.js","9a89484f546650be9f31cdd5c80f5fbc"],["/lib/moment/src/locale/de-at.js","985fb9aa90fbfa3eadf0e749f2622826"],["/lib/moment/src/locale/de.js","811cc6c07b6655fa4424104e51f6bb61"],["/lib/moment/src/locale/dv.js","211bd9c8a40d233c100b1d3f02404645"],["/lib/moment/src/locale/el.js","d0eff2f0c312d769800eadd124ae341c"],["/lib/moment/src/locale/en-au.js","c4313ec6d64657821cb1dc27d105d73f"],["/lib/moment/src/locale/en-ca.js","58530957572d3618d26a1909c8690101"],["/lib/moment/src/locale/en-gb.js","351d56021d9957ce66b85cc44e3054fd"],["/lib/moment/src/locale/en-ie.js","a818d98abf9ef0e61739aea030ad49d3"],["/lib/moment/src/locale/en-nz.js","a630ec34909763329523fd3c7f0999e1"],["/lib/moment/src/locale/eo.js","8500cb16f0265abbcc0ebfaec1b634b3"],["/lib/moment/src/locale/es-do.js","5d2ef24f3f04342dfa374cb6d9d7e000"],["/lib/moment/src/locale/es.js","c2410c163773c5f36a8c5970c67a4ff5"],["/lib/moment/src/locale/et.js","fd3fdbaa50407ff290ebc833a9a7940d"],["/lib/moment/src/locale/eu.js","03b1a6c08ad589ffff8a90ccbe6137cc"],["/lib/moment/src/locale/fa.js","d2f52da87506a4a350eeabcb527aba60"],["/lib/moment/src/locale/fi.js","2ed406837c8a3aa20f5b0fb0e12f925b"],["/lib/moment/src/locale/fo.js","fb2632bdc99dde3c6ac41a21fbd0960e"],["/lib/moment/src/locale/fr-ca.js","480745b78077fd170608d354ececd566"],["/lib/moment/src/locale/fr-ch.js","602a8f779cdb13700b7589c44748cabf"],["/lib/moment/src/locale/fr.js","15620da45b91d82b0b2204983af01351"],["/lib/moment/src/locale/fy.js","ba7e8fc705b6e6bee6454b40af14365e"],["/lib/moment/src/locale/gd.js","32bedccecf7761609f309b6e4a81ef7f"],["/lib/moment/src/locale/gl.js","ad59c577d9f41605d3f069c7735ae8a1"],["/lib/moment/src/locale/he.js","706e8cabecbd24ad4c5b2eef13613170"],["/lib/moment/src/locale/hi.js","5753d26793b5d495dd3fc5fff4a6bd56"],["/lib/moment/src/locale/hr.js","8a420b3d32bf9f87b67f162b6accc27f"],["/lib/moment/src/locale/hu.js","c0153e3581f10696c791cdcca1f7c1f1"],["/lib/moment/src/locale/hy-am.js","be3b7aeaed2a8afceec260f47aa38581"],["/lib/moment/src/locale/id.js","62ea35e46343264843e59657775ee2ae"],["/lib/moment/src/locale/is.js","1407cc0ff39bbca5d90240cb960a48a4"],["/lib/moment/src/locale/it.js","f1ac9b74190e22935c3f1b1387b65189"],["/lib/moment/src/locale/ja.js","d3c0d58e1e3bcf55ec711e0e915b21e1"],["/lib/moment/src/locale/jv.js","d0182a5e73d82a847905e9591fb85e7b"],["/lib/moment/src/locale/ka.js","519bccf1165195496ea6dc5967dcfc11"],["/lib/moment/src/locale/kk.js","900ea66e67ee2fa00838de7c8f35c4a8"],["/lib/moment/src/locale/km.js","f4018e295a1cac9f6f3580140d6334bc"],["/lib/moment/src/locale/ko.js","60c1b88f7479f1d1ffa5e9d0e5f0aa5e"],["/lib/moment/src/locale/ky.js","5ae3047cc0c3983d9535ce4f42f79365"],["/lib/moment/src/locale/lb.js","a11bd95bee7f367fa6b16ee4f86917ce"],["/lib/moment/src/locale/lo.js","21b761cb7f0000c9bf52963d80a99e3e"],["/lib/moment/src/locale/lt.js","04045dedc82f864b3928c022cc8e3409"],["/lib/moment/src/locale/lv.js","34f96b927c016013c5b1ea43d331be8f"],["/lib/moment/src/locale/me.js","7c7953fe2214054ffdee2a5f1c807d90"],["/lib/moment/src/locale/mk.js","a8f218cb2744bac449c9c3286f16254a"],["/lib/moment/src/locale/ml.js","f4090fdd3c0e6682771a38e69273cdd8"],["/lib/moment/src/locale/mr.js","592467aae9f7e10173e24bd441398092"],["/lib/moment/src/locale/ms-my.js","0c8424f29285a11c73e7c7f892e8da50"],["/lib/moment/src/locale/ms.js","78a8f239d2a73ba4f2116fb0aa4f86ca"],["/lib/moment/src/locale/my.js","124b3d7048dd93b21bac4ffa11dcf42c"],["/lib/moment/src/locale/nb.js","6ce9a7cb780cf3dd54647a7d8fb6ebc1"],["/lib/moment/src/locale/ne.js","5d6bd3dbc554276890ed63c16346e9fe"],["/lib/moment/src/locale/nl.js","0cf21e9b110944c047feb084d3502030"],["/lib/moment/src/locale/nn.js","026640a36b1645f937696e75204f2150"],["/lib/moment/src/locale/pa-in.js","ef433c2dcb3f118f2469e4579c899049"],["/lib/moment/src/locale/pl.js","a90c864768eb7498132e5b6b17810c0b"],["/lib/moment/src/locale/pt-br.js","d99b9cc4c46267162155439403716fa3"],["/lib/moment/src/locale/pt.js","232ebc57ea6d024693c6fe2099f86e83"],["/lib/moment/src/locale/ro.js","2db7ebb18e2d813a5bcc72b015b56f42"],["/lib/moment/src/locale/ru.js","7b0c7dffe938af3054b3cafb5588f736"],["/lib/moment/src/locale/se.js","14c9508111285f4211dce108307d208e"],["/lib/moment/src/locale/si.js","0b687bb66dbe3cf559b7773b0b11cabe"],["/lib/moment/src/locale/sk.js","c952427416e9f3c3579fda95987e98d1"],["/lib/moment/src/locale/sl.js","22c33f179fa0f2f7607db7b126bdc1c5"],["/lib/moment/src/locale/sq.js","e4864930152fa5fc3d6d4415eb9f67f7"],["/lib/moment/src/locale/sr-cyrl.js","79a504486dd2432c4a65502730dcddfa"],["/lib/moment/src/locale/sr.js","16e4133ae60116c2de7f9424fe66d2ff"],["/lib/moment/src/locale/ss.js","ea061ee674ed2650e8d96592966ba853"],["/lib/moment/src/locale/sv.js","35c8939ce253afd14faa9f129571262b"],["/lib/moment/src/locale/sw.js","192c0c063dc1c87cda862256e74aab38"],["/lib/moment/src/locale/ta.js","a38599afe605abe8e675750013aaed6f"],["/lib/moment/src/locale/te.js","4de504180a2102438705075d26fd74ac"],["/lib/moment/src/locale/th.js","c0259c7335b1e861b9b5610a21fb204c"],["/lib/moment/src/locale/tl-ph.js","12d6a4b67e4de4ab105e2f7fe65ea75a"],["/lib/moment/src/locale/tlh.js","809451cf22f0e522648f0a3c2192a9e2"],["/lib/moment/src/locale/tr.js","507c7476b2342a10f2d820392691affe"],["/lib/moment/src/locale/tzl.js","ec1c37af0abeb7e78a13028c205c22bd"],["/lib/moment/src/locale/tzm-latn.js","eb32b8fddefe6cec26c2b8afd244a87a"],["/lib/moment/src/locale/tzm.js","e502487098233aba3224dff476a74c34"],["/lib/moment/src/locale/uk.js","93649b4152dc661af231434007d3b77e"],["/lib/moment/src/locale/uz.js","aab1a94f81d9c0b1e76378ad90f7bd2c"],["/lib/moment/src/locale/vi.js","242ef115ff9441040287e3e4f135bb84"],["/lib/moment/src/locale/x-pseudo.js","1e326d8cd4765b7e8f4b256a8be4ee70"],["/lib/moment/src/locale/zh-cn.js","9b94b2716e5fbc73739b82c6643cb15a"],["/lib/moment/src/locale/zh-tw.js","42c9d67a60b7bab923faf0033e3d2196"],["/lib/moment/src/moment.js","6306e8cf3b69ea0bca4f378a33669ff7"],["/lib/moment/templates/amd-named.js","a8ae30da1073a4a5e35d163744825988"],["/lib/moment/templates/amd.js","e8be81b91311609e0ca38057b5b7875e"],["/lib/moment/templates/default.js","5608d5af05cec9c2673112fc992e1357"],["/lib/moment/templates/globals.js","188d1abd7fa683f5bb4622c70ea3037f"],["/lib/moment/templates/locale-header.js","c4c4c63ab033e20d2daa05b1fdb0c7d3"],["/lib/moment/templates/test-header.js","55084cba318d9447ee2770220f66eb41"],["/lib/nvd3/build/nv.d3.css","fdceae0f69705e7a70b63b011f3acdbc"],["/lib/nvd3/build/nv.d3.js","f22f78defd365decb63cd98da268c9e5"],["/lib/nvd3/build/nv.d3.min.css","42367c40fe56376d6c601ce8a453df19"],["/lib/nvd3/build/nv.d3.min.js","702223e42ac1e4a31a02f4624e09fef0"],["/lib/nvd3/meteor/export.js","be196fd7587b50bf39ecb951de91554b"],["/lib/nvd3/package.js","9bba519b1e460483658ef709d7eefe04"],["/templates/leaveFeedback.html","1a94290169e04ddad6178ec345b8bfef"],["/templates/login.html","38f0afb84abc800b8e07d4823cdd59bd"],["/templates/pieManStatus.html","b91b7973c34f2cf7ec633232f60a9d1e"],["/templates/pieReport.html","02ff3f75829a4f74912a0586a24f57b6"],["/templates/reportFeed.html","1d50e4358c57c848dd25da42a54c5ecc"],["/templates/signup.html","579e1774d25c796f884ca2021c89d3a5"],["/templates/tabsController.html","d09e3b76f2038d5c7e4f0e45ef70be8f"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);
  var payload = event.data ? event.data.text() : 'no payload';
  event.waitUntil(
    self.registration.showNotification('Pieman', {
      body: payload
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();
  
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));
});



