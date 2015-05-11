/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
!function(t){"use strict";function e(e){if(e&&""!==e){$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+e+"']").addClass("active");for(var a=0;a<n.length;a++)$(".highlight."+n[a]).hide();$(".highlight."+e).show(),t.toc.calculateHeights(),$(window.location.hash).get(0)&&$(window.location.hash).get(0).scrollIntoView(!0)}}function a(t){if(history){var e=window.location.hash;e&&(e=e.replace(/^#+/,"")),history.pushState({},"","?"+t+"#"+e),localStorage.setItem("language",t)}}function i(t){var a=(t[0],localStorage.getItem("language"));n=t,""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),n)?(e(location.search.substr(1)),localStorage.setItem("language",location.search.substr(1))):e(null!==a&&-1!=jQuery.inArray(a,n)?a:n[0])}var n=[];t.setupLanguages=i,t.activateLanguage=e,$(function(){$(".lang-selector a").on("click",function(){var t=$(this).data("language-name");return a(t),e(t),!1}),window.onpopstate=function(){e(window.location.search.substr(1))}})}(window);