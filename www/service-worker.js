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

var precacheConfig = [["/css/ionic.app.css","2f025e5bd17f42c781f96b5a9bd59f08"],["/css/ionic.app.min.css","55ab771d4b3c398903b7ffa3ba7ba2d7"],["/fonts/roboto/css/fonts.css","d7fe8f22cf3f518ce44f315d27f13661"],["/fonts/roboto/fonts/Roboto-100/Roboto-100.ttf","b0ea79ecda11ad2dabfdda928db2b561"],["/fonts/roboto/fonts/Roboto-100/Roboto-100.woff","58af682d7075bb3510bd041dc8d81706"],["/fonts/roboto/fonts/Roboto-100italic/Roboto-100italic.ttf","e9251dd73aba0509a9bb08bad024db88"],["/fonts/roboto/fonts/Roboto-100italic/Roboto-100italic.woff","36d9e3482400f071d5202885be19ee3f"],["/fonts/roboto/fonts/Roboto-300/Roboto-300.ttf","634f53eb79efa455a9e9d85d608b3447"],["/fonts/roboto/fonts/Roboto-300/Roboto-300.woff","7e2d32e7141050d758a38b4ec96390c0"],["/fonts/roboto/fonts/Roboto-300italic/Roboto-300italic.ttf","1aeedeee0b68884bb34f67a9b3aa76e4"],["/fonts/roboto/fonts/Roboto-300italic/Roboto-300italic.woff","f7f58963e077aaac2476e70ec59ad5be"],["/fonts/roboto/fonts/Roboto-500/Roboto-500.ttf","88f29ea5a372d06f521395134f62ab91"],["/fonts/roboto/fonts/Roboto-500/Roboto-500.woff","0f3b7101a8adc1afe1fbe89775553c32"],["/fonts/roboto/fonts/Roboto-500italic/Roboto-500italic.ttf","b07f691c8304374ab2943cfa1f57d6ed"],["/fonts/roboto/fonts/Roboto-500italic/Roboto-500italic.woff","6fe015419c76da07261300175b1e66d2"],["/fonts/roboto/fonts/Roboto-700/Roboto-700.ttf","ad97d029a11d8b39692037e753d23d1f"],["/fonts/roboto/fonts/Roboto-700/Roboto-700.woff","43183beef21370d8a4b0d64152287eba"],["/fonts/roboto/fonts/Roboto-700italic/Roboto-700italic.ttf","bcfeb9890c11d57f4ebaf5150cd99638"],["/fonts/roboto/fonts/Roboto-700italic/Roboto-700italic.woff","7e3bdb1d31e946199e866262423df9c8"],["/fonts/roboto/fonts/Roboto-900/Roboto-900.ttf","1b72bcbf48ca1ef9e98dccadc4514a92"],["/fonts/roboto/fonts/Roboto-900/Roboto-900.woff","72808932cb03c3e9ace8ba45ff6d9cd4"],["/fonts/roboto/fonts/Roboto-900italic/Roboto-900italic.ttf","862f5eff1ecb4f38d770782bf9e51f81"],["/fonts/roboto/fonts/Roboto-900italic/Roboto-900italic.woff","aa60fa9ca068990c94ad6a4c7c2ebe1d"],["/fonts/roboto/fonts/Roboto-italic/Roboto-italic.ttf","31fc50b4c526d006bf3333b5c04eefaa"],["/fonts/roboto/fonts/Roboto-italic/Roboto-italic.woff","7f839b4cd334882c4729a56e5ec87bf0"],["/fonts/roboto/fonts/Roboto-regular/Roboto-regular.ttf","38861cba61c66739c1452c3a71e39852"],["/fonts/roboto/fonts/Roboto-regular/Roboto-regular.woff","f94d5e5102359961c44a1da1b58d37c9"],["/img/pieman-128.png","005376b904fec5688309522f50208054"],["/img/pieman-192.png","81c4d5fad79e1aa6013be54ae8d8f9f7"],["/img/pieman.png","31a7c397ad6f9bdbc85923ff5b0f2c49"],["/img/piemanHD.png","4c694726be8b6e79c0c832ce7a64794b"],["/index.html","5bf359294495cd6020a860397708a64e"],["/js/app.js","b504ef94636dbb355b90538091086113"],["/js/controllers.js","b860d60e3dba9f957c4ae4bada1bf9fd"],["/js/directives.js","ab4e4d9e8c215ac1add8b79960c12044"],["/js/routes.js","c37a17c2221f8263a16a6506d9bb7586"],["/js/services.js","90de5d76a82c7454fb86ea3c06b5d74f"],["/lib/angular-animate/angular-animate.js","9385b61d5fbebd5b25ab313def614381"],["/lib/angular-animate/angular-animate.min.js","71a13fcafc6dd1842745494a3cf43962"],["/lib/angular-animate/index.js","1bcc4e661ab8ddc751d1a9a8942b370b"],["/lib/angular-nvd3/Gruntfile.js","091e4814167e65c8e4ae46f2463c9429"],["/lib/angular-nvd3/dist/angular-nvd3.js","212059ff92a6cb34df37e972db7584f4"],["/lib/angular-nvd3/dist/angular-nvd3.min.js","8e64d5ee7087973eb380d3eba5d4a504"],["/lib/angular-nvd3/index.js","ca41ba9898e5d34e8d476c26087c8932"],["/lib/angular-sanitize/angular-sanitize.js","305a6f71693bdf21e21cd09f24b2c4d6"],["/lib/angular-sanitize/angular-sanitize.min.js","9f8ca450f716142c9a06790953fb2532"],["/lib/angular-sanitize/index.js","349b703c665246d4f1919931c6c3fb54"],["/lib/angular-ui-router/release/angular-ui-router.js","749a18f80f375e3049975f190a7bfc4e"],["/lib/angular-ui-router/release/angular-ui-router.min.js","04c594b762aba521277ee747b28745d5"],["/lib/angular-ui-router/src/common.js","7cef018108cb4f4571f22b00d9324b82"],["/lib/angular-ui-router/src/resolve.js","8b3e76a8e9242408f366a840cd202105"],["/lib/angular-ui-router/src/state.js","3de988c7a35995b2c910258776d8d086"],["/lib/angular-ui-router/src/stateDirectives.js","9827d4eb264a7fb3d05f1b910b1391f3"],["/lib/angular-ui-router/src/stateFilters.js","84bba4f51e00086d8fe2f93fa1efbf15"],["/lib/angular-ui-router/src/templateFactory.js","8299e97e32fcfd3cc983df3085cc1369"],["/lib/angular-ui-router/src/urlMatcherFactory.js","f93993b00aa676ee329141ef294488e6"],["/lib/angular-ui-router/src/urlRouter.js","34193659b7b21f4f451f20a2878c00c0"],["/lib/angular-ui-router/src/view.js","64214a63924fc3eb6588ed7726485d2b"],["/lib/angular-ui-router/src/viewDirective.js","83174466bc2791816e67939b0243ed28"],["/lib/angular-ui-router/src/viewScroll.js","a899f6b7b01fe905406c4373a0603a23"],["/lib/angular-web-notification/Gruntfile.js","fa2775c73faaf900de411dd92e512471"],["/lib/angular-web-notification/angular-web-notification.js","55e9ff8a9e924f79b6c4175a39427439"],["/lib/angular-web-notification/docs/index.html","19993d6d4db25dddaf42391d731de04f"],["/lib/angular/angular-csp.css","3c6496d2475bec5850eec95eb066944a"],["/lib/angular/angular.js","28c75087388cf69bbaabd3a954d73138"],["/lib/angular/angular.min.js","9a495e66b349fd238c80c7446529be1f"],["/lib/angular/index.js","4a6b945464e73d96c4eddaff73a45417"],["/lib/angularfire/dist/angularfire.js","ef99b9bac182f5b9e540c29e6e9eabf9"],["/lib/angularfire/dist/angularfire.min.js","6d19ce237111bf9798240c47fb2b7490"],["/lib/d3/d3.js","af181029476539b7f3ec8e63f21feb3a"],["/lib/d3/d3.min.js","8da8f16a051fe0b34d9ca10f4a21838f"],["/lib/firebase/firebase.js","41acac24ee962ad3324a2859469eb99f"],["/lib/html5-desktop-notifications2/Gruntfile.js","30e9275b09776dce27c1dfc07646d6e1"],["/lib/html5-desktop-notifications2/dist/Notification.js","2bb0bc422f29f266ec966da641ffa449"],["/lib/html5-desktop-notifications2/dist/Notification.min.js","f7d474cc5626e66dca9370ed3c2e9a95"],["/lib/html5-desktop-notifications2/grunt/aliases.js","563c5da58b76dcebb04fc6c388f8dcc3"],["/lib/html5-desktop-notifications2/grunt/clean.js","87be4edc043b50f5c6ff8be9bd2379fe"],["/lib/html5-desktop-notifications2/grunt/jasmine.js","0305ec449226bb52e4682e0784f0efb4"],["/lib/html5-desktop-notifications2/grunt/uglify.js","5d889cced1520e0c6f076b467ba8fd54"],["/lib/html5-desktop-notifications2/grunt/watch.js","a18f2f18e4edb5d1acd4aead7229c826"],["/lib/html5-desktop-notifications2/karma.conf.js","9adf72cbfe1ea4c4b9e9dd521f1e1d06"],["/lib/html5-desktop-notifications2/server.js","cbd1fa5e399dd29193d144dd5e668294"],["/lib/html5-desktop-notifications2/src/Notification.js","0a936c328d651f4cf7f35965715b9087"],["/lib/html5-desktop-notifications2/test/Notification.spec.js","793f593acb40190527a02ed8f9ef786d"],["/lib/html5-desktop-notifications2/test/vendor/lie.polyfill.min.js","8f5c9e9c2471b57909c8243048cdf04a"],["/lib/ionic-toast/dist/ionic-toast.bundle.min.js","3cbf455189b4a41376ee15affa556c38"],["/lib/ionic-toast/gulpfile.js","e0552317e1936013000d23a8502c5e0b"],["/lib/ionic-toast/src/ionic-toast.css","830824d80948cdb1a6aa8b97a06e3b77"],["/lib/ionic-toast/src/ionic-toast.module.js","573bfd52f975e0282a605d2d51f162ef"],["/lib/ionic-toast/src/ionic-toast.provider.js","bc14d4a02316376bb0a490ca72d35b3b"],["/lib/ionic-toast/src/ionic-toast.run.js","4dcebce16e166fe0363f9ac771882859"],["/lib/ionic/css/ionic.css","169725e0bb0f1b3a3780a38358815836"],["/lib/ionic/css/ionic.min.css","49f66e19303768d9ea65179deefe394b"],["/lib/ionic/fonts/ionicons.eot","2c2ae068be3b089e0a5b59abb1831550"],["/lib/ionic/fonts/ionicons.svg","c037dbbc0e6790f30e824a50010df5fb"],["/lib/ionic/fonts/ionicons.ttf","24712f6c47821394fba7942fbb52c3b2"],["/lib/ionic/fonts/ionicons.woff","05acfdb568b3df49ad31355b19495d4a"],["/lib/ionic/js/ionic-angular.js","b7250cf58b3e0f81bef21ffddb424523"],["/lib/ionic/js/ionic-angular.min.js","b95298e98c5acbcaef4bf36ad85f5ef7"],["/lib/ionic/js/ionic.bundle.min.js","34f01b72689414a224badd9089566158"],["/lib/ionic/js/ionic.js","bd36363bef2c9880bdadc12ad2cfc42c"],["/lib/ionic/js/ionic.min.js","a8c2d723002b87647bc67c088c9600a5"],["/lib/ionicuirouter/ionicUIRouter.js","41d24b938abb2959325a963b956e3f39"],["/lib/moment/locale/af.js","edd2d1eca046a1c780e94b5bbada7fa9"],["/lib/moment/locale/ar-ma.js","750f649741f29dbb02bdd451d2f3cf71"],["/lib/moment/locale/ar-sa.js","1306aae4bd2e9c0d582c93cbeb47f604"],["/lib/moment/locale/ar-tn.js","69832ce4995f984fbcff642c8cfb2339"],["/lib/moment/locale/ar.js","6bdd20cd15a178e21e3e15bf283a5412"],["/lib/moment/locale/az.js","fee954eaf4df1d75bc6027149e27e6ef"],["/lib/moment/locale/be.js","4a562f48c08a2b5301ebc033b19a1842"],["/lib/moment/locale/bg.js","33563e0c93f4f725e9f17ed47b5b0419"],["/lib/moment/locale/bn.js","244e89be9b3a672c2225f910c9627d69"],["/lib/moment/locale/bo.js","786a16691d0b3ac4b4274149bc4cdfbb"],["/lib/moment/locale/br.js","82e704475753a796151864ba276173b6"],["/lib/moment/locale/bs.js","d4060021996d36c0a800493487feea31"],["/lib/moment/locale/ca.js","20b3c5874dd0429ca029569c650e18a9"],["/lib/moment/locale/cs.js","87bf52041b59e4351fe6bc15bce87d79"],["/lib/moment/locale/cv.js","8e25c461a96cb72c022d6ac6ed8db39e"],["/lib/moment/locale/cy.js","3de286d633517b390a93c18dd3bfd3e0"],["/lib/moment/locale/da.js","a0816e912ff56e32f5ef6f32d6c6d85b"],["/lib/moment/locale/de-at.js","19029658baa251a3614f89e965731f7e"],["/lib/moment/locale/de.js","1ad1b71337ab377fe5b2d7a8ef3e8f38"],["/lib/moment/locale/dv.js","a25e2fa75767a9503e54b9c8a2d0f4bb"],["/lib/moment/locale/el.js","d4d86060d21195c0d2ad269720c212d7"],["/lib/moment/locale/en-au.js","6bb892c17c84715d7146c66510a75e84"],["/lib/moment/locale/en-ca.js","849eb8a4474d91bee8f2a4005b71b89e"],["/lib/moment/locale/en-gb.js","c72b9cf78b619b9914a5f5922ecbaa64"],["/lib/moment/locale/en-ie.js","65ede52d92fe7eb8e8025351d6706dca"],["/lib/moment/locale/en-nz.js","064ddf747db0827f062144855976cd00"],["/lib/moment/locale/eo.js","d5b92692b2eb895da925b956f9ca1a94"],["/lib/moment/locale/es-do.js","a90f00d257fe4aa45ebe5766ddf1643f"],["/lib/moment/locale/es.js","54a5de40f8ea4265a4c0b3f5f8be2cce"],["/lib/moment/locale/et.js","137ae1e3d08696bf11f8278e634514ec"],["/lib/moment/locale/eu.js","73df8fe8c73341fa9bfca77b2aa88eef"],["/lib/moment/locale/fa.js","74171a65e749a784229746a884a00970"],["/lib/moment/locale/fi.js","b6c2935b4712f2a7cd821894bf12d0e9"],["/lib/moment/locale/fo.js","27f285eda5537ee32e0277b6ef8c4726"],["/lib/moment/locale/fr-ca.js","56090d313c0a71fc7727e299bc4a3908"],["/lib/moment/locale/fr-ch.js","5eec22101ecd32af605e3b64f2ad16a9"],["/lib/moment/locale/fr.js","d52f78175804d09fe1ec1ce9c1e63778"],["/lib/moment/locale/fy.js","94ec0f9e4848b85ace826787890febd4"],["/lib/moment/locale/gd.js","96386ef295f97bbb74ec683feb6e20fc"],["/lib/moment/locale/gl.js","a8883815ec262755c88925796e120979"],["/lib/moment/locale/he.js","7cf7770595683dbc704cd866e44c0efd"],["/lib/moment/locale/hi.js","43cadeec03ad9e325c30fdf498cedb08"],["/lib/moment/locale/hr.js","baf102f0dbe7cb1e81be57b80e2fddda"],["/lib/moment/locale/hu.js","0fce99f17a5c18e0fffa9937fbeef868"],["/lib/moment/locale/hy-am.js","4b9281ed0be858a09baf32dce7c38451"],["/lib/moment/locale/id.js","56813734637c0c16a0d6b36910f7bf36"],["/lib/moment/locale/is.js","01a247ad4000f3c1c28d504896e03d0f"],["/lib/moment/locale/it.js","46bf765303491c0f6982c1d04553920b"],["/lib/moment/locale/ja.js","8c6e51492ed3b399bc98ec0dd0c5895f"],["/lib/moment/locale/jv.js","fa981c336f340cb44ad1a4cfb655bcf7"],["/lib/moment/locale/ka.js","02b7e3ad2a107a38c7ceba72c1ee5020"],["/lib/moment/locale/kk.js","deaeeb292d31a889235f49a4f7affebf"],["/lib/moment/locale/km.js","0682aac082330303bad30119beabffca"],["/lib/moment/locale/ko.js","3e1c58fe1264f00ffa959ed77dc1c8d4"],["/lib/moment/locale/ky.js","d9a9750f06cea9cb78bb1a386b7fda36"],["/lib/moment/locale/lb.js","989c0112f0533fc11d79bbfe2a3c4cd3"],["/lib/moment/locale/lo.js","fe01320fe7dd3040a221677d93972405"],["/lib/moment/locale/lt.js","68fbc56411f236ca704a4958c36f6bbe"],["/lib/moment/locale/lv.js","e992ddd10d3679adb677980e88644459"],["/lib/moment/locale/me.js","a61a3d9782332dfeda1c12e91e45463f"],["/lib/moment/locale/mk.js","025e710ed662a99f6cce7bd3e7c94a1b"],["/lib/moment/locale/ml.js","671b3f990209f02c7436e2368ee339e8"],["/lib/moment/locale/mr.js","e2f1fe6179f0e30891d550379ef62b90"],["/lib/moment/locale/ms-my.js","92aeaa086678c4fdc960fcc0bcc66024"],["/lib/moment/locale/ms.js","e8174cf0244ffd6aed7a7a2be9fb2f82"],["/lib/moment/locale/my.js","f644b4412ab113d413e52f36a4048242"],["/lib/moment/locale/nb.js","5902f0ff08b5e20e09f014edb2f9ba8e"],["/lib/moment/locale/ne.js","c7d7c7f7bfff54516c78ca46fe947104"],["/lib/moment/locale/nl.js","57c5d098ad76c0c3f641e911ba3a59f5"],["/lib/moment/locale/nn.js","5e2ca1ad6f6666ac40e94ba0300e9b3d"],["/lib/moment/locale/pa-in.js","9793e2a7c769fbfa95be3a202ff1b346"],["/lib/moment/locale/pl.js","d45ec6554fcf1b3a7504122057adc7c9"],["/lib/moment/locale/pt-br.js","136cfc6832c1171c0c7319d0cd722fba"],["/lib/moment/locale/pt.js","d0be1f3a794d5ce7663107e0cb8c9781"],["/lib/moment/locale/ro.js","e0257c59d496740a3ca3b9fae6836da6"],["/lib/moment/locale/ru.js","7d06e7b10bb030a2dbe37f41f2fe31f6"],["/lib/moment/locale/se.js","e5064ab52d36a704ded320b76278d2ea"],["/lib/moment/locale/si.js","c53120da85c0cc69ce45a7840ea84eb8"],["/lib/moment/locale/sk.js","b76bb26a8fd63480cd48bbfaed63143e"],["/lib/moment/locale/sl.js","4de5274876a097ce83ca77a5f223d990"],["/lib/moment/locale/sq.js","dbaa34a150f7fb4cf37be1ffa2024af8"],["/lib/moment/locale/sr-cyrl.js","5e99598e316612592f11e8f265458dba"],["/lib/moment/locale/sr.js","1972119abd4e2223b797819602e32e2d"],["/lib/moment/locale/ss.js","913fc3633c1c06ef949e9eae098567e2"],["/lib/moment/locale/sv.js","092c765a8c2329bccc50a170daee4774"],["/lib/moment/locale/sw.js","32c75d8f0176c686c271c94c552dee10"],["/lib/moment/locale/ta.js","90f9de21fd36cef68c8ca90938054306"],["/lib/moment/locale/te.js","0d1807935e4c871823ba59340406b2d4"],["/lib/moment/locale/th.js","ecebe158dff7ed408398ecfbdafcf46f"],["/lib/moment/locale/tl-ph.js","8088e900ff30276a3360b0c66f9d3aac"],["/lib/moment/locale/tlh.js","03c55a8a69517a232698eb864b358f50"],["/lib/moment/locale/tr.js","5bdcda9a98098bdd8910ca994a6af8ca"],["/lib/moment/locale/tzl.js","90db8d39213fff94079de3fcfd50f545"],["/lib/moment/locale/tzm-latn.js","f8a539a9ee2c5674f2da55469d1444d4"],["/lib/moment/locale/tzm.js","67811b9143d14901a00bacefc6905760"],["/lib/moment/locale/uk.js","fa5c0059d52b3f182f6e00a94c72bde7"],["/lib/moment/locale/uz.js","0a81e2edcc3358201e0a6b0686c8e7e8"],["/lib/moment/locale/vi.js","a748c5f2f6e831a424df712c1dde7c52"],["/lib/moment/locale/x-pseudo.js","922884c7256e4430585c389db5ce0b47"],["/lib/moment/locale/zh-cn.js","11c91db29b1d825487235b34f4ca7020"],["/lib/moment/locale/zh-tw.js","585b62f04381687bdda5b8883b316709"],["/lib/moment/min/locales.js","2d0decbc291810045c3a55b05440ceeb"],["/lib/moment/min/locales.min.js","d79b95b49a6068c2d802e6dfdd3030a5"],["/lib/moment/min/moment-with-locales.js","f3301d96d77a762f222991488c522ae1"],["/lib/moment/min/moment-with-locales.min.js","0324975b717696cb10c62f2424db1996"],["/lib/moment/min/moment.min.js","0e70d83e8562e3b3a4058ef929add92d"],["/lib/moment/moment.js","def28b1f73f199f7b36bb6fb1a57cbd5"],["/lib/moment/src/lib/create/check-overflow.js","74d0a25a5349440cfabb601ae4cd0a5b"],["/lib/moment/src/lib/create/date-from-array.js","70cdb95053a749473509a2b2a20c479f"],["/lib/moment/src/lib/create/from-anything.js","a49f9fbfb5021c938a4530cc9c4e8346"],["/lib/moment/src/lib/create/from-array.js","4aba25b6f747c9ca265f3786be7762db"],["/lib/moment/src/lib/create/from-object.js","e775e848c6ff1e1f6636ff6d3aab8274"],["/lib/moment/src/lib/create/from-string-and-array.js","a319461e73ad435104b12aa67f6201c1"],["/lib/moment/src/lib/create/from-string-and-format.js","47545f87e88710947380bde93acd3d08"],["/lib/moment/src/lib/create/from-string.js","540ad38f9b834b593f88bfd25181035c"],["/lib/moment/src/lib/create/local.js","227aa9c1d9f974d43f05bde9ff051c75"],["/lib/moment/src/lib/create/parsing-flags.js","1a0edc379d5a7eb4289b349453da9a7c"],["/lib/moment/src/lib/create/utc.js","0ac07380d9545b979f2186ac3fd159df"],["/lib/moment/src/lib/create/valid.js","1c03ba4df1c81cf0b2f90fc2dcf01882"],["/lib/moment/src/lib/duration/abs.js","dfcc9d167e79f68359bb88e67c847fda"],["/lib/moment/src/lib/duration/add-subtract.js","fd2fc14224a117e2dffa71cba490831c"],["/lib/moment/src/lib/duration/as.js","ddd9de0980bebbb3745598dee92c9cd5"],["/lib/moment/src/lib/duration/bubble.js","6669ac75553e4e917040eb3e119bba95"],["/lib/moment/src/lib/duration/constructor.js","25da541a08e4354d935ef395bbc2a143"],["/lib/moment/src/lib/duration/create.js","74243584b55529fa7ca81d7bbc389a84"],["/lib/moment/src/lib/duration/duration.js","a7f20be172038c7be684dbe2247c4064"],["/lib/moment/src/lib/duration/get.js","33ac5d79bdf88ac655c0df42c202e824"],["/lib/moment/src/lib/duration/humanize.js","760d68e1ebea155cef342b826090211e"],["/lib/moment/src/lib/duration/iso-string.js","55da282b12cf9d3abb7262acd1ddbfca"],["/lib/moment/src/lib/duration/prototype.js","f0ab7043b240694ece98bd70212930ec"],["/lib/moment/src/lib/format/format.js","cd65a9a90cd0efe307d34dd8f2f1506f"],["/lib/moment/src/lib/locale/base-config.js","f07c66093992e4a8cca64c74e94f9fd5"],["/lib/moment/src/lib/locale/calendar.js","5fd73a601cd44071489473e608fd2c8f"],["/lib/moment/src/lib/locale/constructor.js","f384c1b645aa959b36e27c65d70e1b50"],["/lib/moment/src/lib/locale/en.js","dcab757c04d366dcb1b93094d143c484"],["/lib/moment/src/lib/locale/formats.js","76cb1dda8ca856d18c86b540c1e0b15b"],["/lib/moment/src/lib/locale/invalid.js","307508bb10d23d97a2b37202d1221cf6"],["/lib/moment/src/lib/locale/lists.js","4d6a927a3340d03de3323f9051346bb9"],["/lib/moment/src/lib/locale/locale.js","9dfad082faa5c9cdf83c88e960382195"],["/lib/moment/src/lib/locale/locales.js","be58fca64aa8dd0a7259481c13dc2491"],["/lib/moment/src/lib/locale/ordinal.js","d5825c8bd49d9054cacc79257240e9ce"],["/lib/moment/src/lib/locale/pre-post-format.js","931294a5f13ab02eb3da493c258d1849"],["/lib/moment/src/lib/locale/prototype.js","3273a5110b263bbfb17071c4ca41f951"],["/lib/moment/src/lib/locale/relative.js","e62bff3aa624d90abb909d458446c5cc"],["/lib/moment/src/lib/locale/set.js","58e4e0e5c587c00650709b5544f5eda8"],["/lib/moment/src/lib/moment/add-subtract.js","7155d319c2b829bf90007571cb1d5af9"],["/lib/moment/src/lib/moment/calendar.js","d9199622c8a6562b5e02cf2cc8d48b90"],["/lib/moment/src/lib/moment/clone.js","d0470b1e82d649323028356150d6055c"],["/lib/moment/src/lib/moment/compare.js","82d031746e060a847112b5d7244e0d6d"],["/lib/moment/src/lib/moment/constructor.js","f4459716fd14017e7613a8c4691c9583"],["/lib/moment/src/lib/moment/creation-data.js","3f8d42a3d8764254fe35b7d2c1302f58"],["/lib/moment/src/lib/moment/diff.js","73284549071a1e6c83fe2d34d2ea0c56"],["/lib/moment/src/lib/moment/format.js","c624a5d81cfa3d69d90c87919398746c"],["/lib/moment/src/lib/moment/from.js","6674918dadc95d7f1cf459c42cfa2bb8"],["/lib/moment/src/lib/moment/get-set.js","4ff7d31290698fce643a2abbade473e3"],["/lib/moment/src/lib/moment/locale.js","18a1e3f0e0ee5be90828ab27cb85541c"],["/lib/moment/src/lib/moment/min-max.js","6eb12e940d8616cf7e7407f2d9fa48b0"],["/lib/moment/src/lib/moment/moment.js","8eb29fab9b4b3d775bacdac079d6d6a1"],["/lib/moment/src/lib/moment/now.js","4eb53cc70f29e5e7766dc7711e079977"],["/lib/moment/src/lib/moment/prototype.js","35f477d2fb10b9e090675f2fd58b53ab"],["/lib/moment/src/lib/moment/start-end-of.js","0ff904532021cc6b6473de17803ed9d0"],["/lib/moment/src/lib/moment/to-type.js","a9a157015440a8cf630c8430692c32fd"],["/lib/moment/src/lib/moment/to.js","c64c8a3da294ee772a692d2ced4bdd3c"],["/lib/moment/src/lib/moment/valid.js","0650c1c61bcf5178355b704ddbe0bc3f"],["/lib/moment/src/lib/parse/regex.js","996a69cf662954d57668b1ed72be76d7"],["/lib/moment/src/lib/parse/token.js","9bada618d6415ba430836893a3978688"],["/lib/moment/src/lib/units/aliases.js","32cf563ceeb9ea15956931e2c631f3e6"],["/lib/moment/src/lib/units/constants.js","6f2171ece5860ccc1f0267a5c618fd6a"],["/lib/moment/src/lib/units/day-of-month.js","04f859e579093b79d230e049e816526f"],["/lib/moment/src/lib/units/day-of-week.js","396fef2c677cbce9345dd9018bdd3ddf"],["/lib/moment/src/lib/units/day-of-year.js","9a1909e4a60fedc123920cafbfc0e90f"],["/lib/moment/src/lib/units/hour.js","198d2e3d5a7a4463eb12fb6dc2fcb7f2"],["/lib/moment/src/lib/units/millisecond.js","10467099e7de9dd25c216cef85eafc27"],["/lib/moment/src/lib/units/minute.js","5e2763140457d441678a7243c2afdaaa"],["/lib/moment/src/lib/units/month.js","ff31a794d9e6e153b9ad58566fb37dc3"],["/lib/moment/src/lib/units/offset.js","4a3fce860a88a52c57f1b9cae468261a"],["/lib/moment/src/lib/units/priorities.js","4deabd3326881e0c070fa932b8438c4a"],["/lib/moment/src/lib/units/quarter.js","f4e2b9611fd2fd431c9f441a252ace6e"],["/lib/moment/src/lib/units/second.js","2b59d995e1132dd35c610d49aeb8a088"],["/lib/moment/src/lib/units/timestamp.js","50a833ae0d358cfe93866692b6b62567"],["/lib/moment/src/lib/units/timezone.js","bff6a81d59ac5b1a3a6cc65df889c468"],["/lib/moment/src/lib/units/units.js","0ef11c0195517be901ec5a2176837c6f"],["/lib/moment/src/lib/units/week-calendar-utils.js","3e55f760be43a5cf80e70cc76fa8bb2a"],["/lib/moment/src/lib/units/week-year.js","21fc45183208be89f970a7bb45e89273"],["/lib/moment/src/lib/units/week.js","859fd604d275e5db54defefe7c3b3ed2"],["/lib/moment/src/lib/units/year.js","2ae6c173ccb1033e607f8116e0d305f5"],["/lib/moment/src/lib/utils/abs-ceil.js","64639c9f012c7607fbed8c57025cef44"],["/lib/moment/src/lib/utils/abs-floor.js","e8fb4df77278120e0b60e527ac0a1dbb"],["/lib/moment/src/lib/utils/abs-round.js","05b9610e43a001d4881fd13be6f54cd3"],["/lib/moment/src/lib/utils/compare-arrays.js","8fd2b3e02e32b140494699da701265a0"],["/lib/moment/src/lib/utils/defaults.js","504e992d374d841232a222cd3950983c"],["/lib/moment/src/lib/utils/deprecate.js","6874ed09fadb00cde228e2b50a1036e8"],["/lib/moment/src/lib/utils/extend.js","ff526cdd064f1377b2a6f7ffaab4963b"],["/lib/moment/src/lib/utils/has-own-prop.js","fc779a8b9b4f91b9b9f7baa19b818967"],["/lib/moment/src/lib/utils/hooks.js","b3dab55b34fdbe8573d0756fdd6aec46"],["/lib/moment/src/lib/utils/index-of.js","5da1c9d4e4b387fdfe774ff7af945e81"],["/lib/moment/src/lib/utils/is-array.js","afac55da9cfb85e6ded30d97e68090ff"],["/lib/moment/src/lib/utils/is-date.js","0181e6bd91cb9f9a7e8402a38880d14a"],["/lib/moment/src/lib/utils/is-function.js","10f335ae8ef525e7cad21b305613fff3"],["/lib/moment/src/lib/utils/is-object-empty.js","f3df588b6d7191d8f63b821049280044"],["/lib/moment/src/lib/utils/is-object.js","333b7d646bf0998bbe32104f92c0cb1e"],["/lib/moment/src/lib/utils/is-undefined.js","0be83573c7e9689cd2451842f6e4e64c"],["/lib/moment/src/lib/utils/keys.js","99bf9c18e2797e54cce533bb327ec6ce"],["/lib/moment/src/lib/utils/map.js","0aa4d21f94e8491e2c6cd99e7d30fdab"],["/lib/moment/src/lib/utils/some.js","66a30f371f7897286d85eedfc0d165f8"],["/lib/moment/src/lib/utils/to-int.js","88db30d97951d500c3ce63c2dcd429a3"],["/lib/moment/src/lib/utils/zero-fill.js","71ddff4ec0ba668921e523b2c92e20fe"],["/lib/moment/src/locale/af.js","9518f20b6dd8b81a465209e8a1a4eaaf"],["/lib/moment/src/locale/ar-ma.js","6768071e13b354bbe0ea11f1d944e850"],["/lib/moment/src/locale/ar-sa.js","b8a0d5f6be1d4680e1fe34a158a546f0"],["/lib/moment/src/locale/ar-tn.js","0ed77c5cbb6f9bcc3f30a5ab201c788a"],["/lib/moment/src/locale/ar.js","8e3a7ff92e415e886fdd9a0b2c2ffa64"],["/lib/moment/src/locale/az.js","e96943ee33e475818eddfbfac167526f"],["/lib/moment/src/locale/be.js","1514f45283948e89f6c6b68072c2664f"],["/lib/moment/src/locale/bg.js","d969f4196a030f83195abec2979907aa"],["/lib/moment/src/locale/bn.js","faf1fd2d0fa3b02fdc9dd3862bfd3f3b"],["/lib/moment/src/locale/bo.js","e01a8779895305972ec797fc240003d3"],["/lib/moment/src/locale/br.js","02f4802cd9ec5ced203bb9762acc96b7"],["/lib/moment/src/locale/bs.js","281fe7c6fd4e8571fc8d0c764192026f"],["/lib/moment/src/locale/ca.js","8fbe8fbf8a890d37bb818d19ebc652c5"],["/lib/moment/src/locale/cs.js","cf6c0dfb92d9b9cf9f93e573f32ef659"],["/lib/moment/src/locale/cv.js","8f8ded56d3feb6e345d139d1a63ef83a"],["/lib/moment/src/locale/cy.js","15956cc2e28c7ceb54cace5d14ff09aa"],["/lib/moment/src/locale/da.js","c8e0cf6337ef3d1a58e42dccd5f8b6c9"],["/lib/moment/src/locale/de-at.js","67760ea9bbe7eb0979ff65200162f04c"],["/lib/moment/src/locale/de.js","91181547f75a38736ddbb708acd7ed91"],["/lib/moment/src/locale/dv.js","4b5137e12e187f8cedaa5a1278854b0d"],["/lib/moment/src/locale/el.js","0bd96e2e03a828bbfaf00820a538bdc1"],["/lib/moment/src/locale/en-au.js","89711d1cf439c8f0df46b4f255dc9d83"],["/lib/moment/src/locale/en-ca.js","27dec3a5e2941744e6c8e77b52612821"],["/lib/moment/src/locale/en-gb.js","a71a3eae0b0b4c98883fe190925c011e"],["/lib/moment/src/locale/en-ie.js","fea9973419cde74cbe4e35afdf6b0cae"],["/lib/moment/src/locale/en-nz.js","714e5d430b0540544ea78051249b71ee"],["/lib/moment/src/locale/eo.js","f055efb6371fb629706e3a5b89e54a7b"],["/lib/moment/src/locale/es-do.js","f49d99c5ad9e58e8604514f6026c7b30"],["/lib/moment/src/locale/es.js","e177081c9a027d7ea8612528bb11f267"],["/lib/moment/src/locale/et.js","6cf15fe291e3fa81ac768d20ea19e375"],["/lib/moment/src/locale/eu.js","4e487dbf1641ac3a991659c9b40039e2"],["/lib/moment/src/locale/fa.js","33db7de121ee67b25748fd8f30015934"],["/lib/moment/src/locale/fi.js","b30cd39580e0477f1e4ae7c058ee831f"],["/lib/moment/src/locale/fo.js","69f882b2eb6b6f0da4a9b8d0233818de"],["/lib/moment/src/locale/fr-ca.js","775ce0412712bd5372493c021c20ea0f"],["/lib/moment/src/locale/fr-ch.js","2a177db84abe6d2053b0b794338bcd03"],["/lib/moment/src/locale/fr.js","558910280eea675d5d6fd38cfc79e6f8"],["/lib/moment/src/locale/fy.js","a14d6870afe0af25edef9ae566ebcbb2"],["/lib/moment/src/locale/gd.js","24f889b9d1efdc6792e3efc67e147c94"],["/lib/moment/src/locale/gl.js","75c177320a18d4dd977c7c5bcac18372"],["/lib/moment/src/locale/he.js","ab51604ef8724aa6d6edc45d1af25b02"],["/lib/moment/src/locale/hi.js","257023ad24c31acbdedb9661c777a6bb"],["/lib/moment/src/locale/hr.js","5092056a50a0a25ac531bc995e60e1eb"],["/lib/moment/src/locale/hu.js","e2027abb8b46fd65c3e35e217a0b85fe"],["/lib/moment/src/locale/hy-am.js","ffa8b1c82419328359bb637be02bcf2f"],["/lib/moment/src/locale/id.js","6c5e2d2615b9f0f64a516a59831d2bb3"],["/lib/moment/src/locale/is.js","213332f667e4f8d3fc5a1cf8aa8ca92c"],["/lib/moment/src/locale/it.js","009d3d67960e6e40d5656fb65b0af7d4"],["/lib/moment/src/locale/ja.js","edb455679a92f260e12b545c0968ecb5"],["/lib/moment/src/locale/jv.js","54ea15e25811bdeab79ed74eebf42abf"],["/lib/moment/src/locale/ka.js","9c9480a3fef7f6b0dc0f8dfbd60cf05b"],["/lib/moment/src/locale/kk.js","c4fadb2d6c6d899c2e08c57608f57353"],["/lib/moment/src/locale/km.js","952a90138600e214dc8e32506dab8123"],["/lib/moment/src/locale/ko.js","31935a7ce4010d3d696e0fc54718a295"],["/lib/moment/src/locale/ky.js","abac4c5833b6fbb0100d6cd61803ee5a"],["/lib/moment/src/locale/lb.js","d54d46019970125b4f098a7105d17342"],["/lib/moment/src/locale/lo.js","1010c4b01448c3f1679dadbe73aa1cb7"],["/lib/moment/src/locale/lt.js","4beadd086f1ad54491ffd31880515514"],["/lib/moment/src/locale/lv.js","be85180e7ef1fd4e223537981d555f70"],["/lib/moment/src/locale/me.js","dc6e60d9e7395439447783fc2c032ed3"],["/lib/moment/src/locale/mk.js","ee5c148ac16b577237955abda2a3ad19"],["/lib/moment/src/locale/ml.js","d8095bf41de41c30ce7bb4ff658339e3"],["/lib/moment/src/locale/mr.js","4ec00248ea8fd86a98fabbc423bc9ac7"],["/lib/moment/src/locale/ms-my.js","15a6709d25e31306a1f62e68dfdc85b7"],["/lib/moment/src/locale/ms.js","e3e52aa583947df6a7bbf4e6880bd779"],["/lib/moment/src/locale/my.js","416b0c108a47b59b49cde6b10c49bf68"],["/lib/moment/src/locale/nb.js","cf01e92a90cec97aee0bf8cc95a1c640"],["/lib/moment/src/locale/ne.js","1fa04d50bd2555f2572c7a16ebe06905"],["/lib/moment/src/locale/nl.js","7ae3650fb9675a96fdb5c5a79ffcb7f4"],["/lib/moment/src/locale/nn.js","f03fb9fc94d992769f62660cbd8a82b1"],["/lib/moment/src/locale/pa-in.js","fb6a0bc229ef2bdee965d5511cea59a0"],["/lib/moment/src/locale/pl.js","c1149e5c57bad3675600441ed52f204d"],["/lib/moment/src/locale/pt-br.js","58aa70909d2b2e0e18785d6b546547cd"],["/lib/moment/src/locale/pt.js","e5bb2ff8206f7fa5384d3f07614ade22"],["/lib/moment/src/locale/ro.js","3b8ef013c7bf01f51305305c4522bb3e"],["/lib/moment/src/locale/ru.js","822944adf7a9d0227090658604dfd0d0"],["/lib/moment/src/locale/se.js","e6db7384bcd28f94266800d4c34abd1d"],["/lib/moment/src/locale/si.js","8332b26efe59ddb5192f29af6bbd3017"],["/lib/moment/src/locale/sk.js","e2636e7f41f373e10006cc2759f1af16"],["/lib/moment/src/locale/sl.js","5b2534766b7b8d23f5c843091e4464e8"],["/lib/moment/src/locale/sq.js","95b0107b39f24a0e5f07b813bd0fb219"],["/lib/moment/src/locale/sr-cyrl.js","88e51b74cbd05f356f0605fd4eff4ea1"],["/lib/moment/src/locale/sr.js","1016d5f258d4957a2803f7fa6df135ce"],["/lib/moment/src/locale/ss.js","4bfc8fe235b15e1ddf1f5bbfea5024db"],["/lib/moment/src/locale/sv.js","63eec0ec9590b172478f32b8f83585ed"],["/lib/moment/src/locale/sw.js","43e0063f957025c55f37ac3de13bb0e0"],["/lib/moment/src/locale/ta.js","7dd102370457eff874ad08c0085484a1"],["/lib/moment/src/locale/te.js","e7f987b95bcfeda505fc24219a35f2e8"],["/lib/moment/src/locale/th.js","6e02c3d434ae5009ceeac462ea74aa10"],["/lib/moment/src/locale/tl-ph.js","1952a5277b79850338f16f614cb8b27f"],["/lib/moment/src/locale/tlh.js","bd20adc451fff0d4bad2a19183afb707"],["/lib/moment/src/locale/tr.js","6b6d8c0096699c7c7ab227749528098c"],["/lib/moment/src/locale/tzl.js","6ed7cf77a140ef2304a7cecd88bec732"],["/lib/moment/src/locale/tzm-latn.js","f864fcb28032a0c388ace7907950d226"],["/lib/moment/src/locale/tzm.js","b7e068628a74bf07bcb9d64f0af0ceab"],["/lib/moment/src/locale/uk.js","0f21303fb1ca196ccc88757b802e629e"],["/lib/moment/src/locale/uz.js","1702de6afa457b10e1232ff553aca93d"],["/lib/moment/src/locale/vi.js","05a2cda0793e6e331c2e626dbe0724f2"],["/lib/moment/src/locale/x-pseudo.js","ae7ef8f0119015f75e7cf17475b8c6ed"],["/lib/moment/src/locale/zh-cn.js","03b387a69fab0e38eaaeda41530b7fd8"],["/lib/moment/src/locale/zh-tw.js","93767717d2e765d7ec603472ebb3a19d"],["/lib/moment/src/moment.js","1b44f852f779374537a9aab6951c6a8d"],["/lib/moment/templates/amd-named.js","2c43efa6cf0b811da9d9c397f09c9f3f"],["/lib/moment/templates/amd.js","1f31b1c7e178a0e140fccc968ce09541"],["/lib/moment/templates/default.js","cf287c1cd5c1eddbfea88773f78f17ad"],["/lib/moment/templates/globals.js","287f3b56cc8bdc43a5b91340b101dd35"],["/lib/moment/templates/locale-header.js","390665b0d66818a8cedbdc451bed932c"],["/lib/moment/templates/test-header.js","d6b83c2f0875fe0a11cf510d40ec26f0"],["/lib/ngstorage/ngStorage.js","587579c86a0ccf812c91ecb5905d98b6"],["/lib/ngstorage/ngStorage.min.js","ee45fc1dc996fc2033bc24c058f95fe4"],["/lib/ngstorage/package.js","62510ac35f392608ce18bf7872570f0b"],["/lib/nvd3/build/nv.d3.css","43a2fb58fdbbdaf77e7bd2b6be70f791"],["/lib/nvd3/build/nv.d3.js","010c53629f836cd3d86fd478c4961615"],["/lib/nvd3/build/nv.d3.min.css","7433cac9cfd7267ca3fb2a42d01052ea"],["/lib/nvd3/build/nv.d3.min.js","024481f5dd5d6be883d6cbb0f5b45bda"],["/lib/nvd3/meteor/export.js","8a9c74634f7a284ac4f965a4d5123bc3"],["/lib/nvd3/package.js","ea6299f0e6fa34ef46f94ee5acdcdbb5"],["/templates/leaveFeedback.html","1a94290169e04ddad6178ec345b8bfef"],["/templates/pieManStatus.html","30d152120f0b3009bddf74fccd88e4e0"],["/templates/pieReport.html","e1497864335fb47b9cd6accdd3ec8b62"],["/templates/reportFeed.html","1d50e4358c57c848dd25da42a54c5ecc"],["/templates/tabsController.html","d09e3b76f2038d5c7e4f0e45ef70be8f"]];
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








importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
  authDomain: "pieman-d47da.firebaseapp.com",
  databaseURL: "https://pieman-d47da.firebaseio.com",
  storageBucket: "pieman-d47da.appspot.com",
  messagingSenderId: "371107496995"
};

firebase.initializeApp(config);

firebase.messaging();
