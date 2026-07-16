/* Zoho Form Modal Functionality */

(function() {
    try {
        if (document.readyState == "complete") {
            onloadActions_33358();
        } else {
            window.addEventListener('load', function() {
                onloadActions_33358();
            }, false);
        }

        function onloadActions_33358() {
            constructDiv_33358();
        }

        function constructDiv_33358() {
            var iframeDiv = document.createElement("div");
            iframeDiv.setAttribute('id', '1hrSbylzXXLIPI066zfkq-7DL1R5GwOFvE14szZTM4c_33358');
            iframeDiv.setAttribute('class', 'zf_main_id_33358');

            var closeFormDiv = document.createElement("div");
            closeFormDiv.setAttribute('id', 'deleteform_33358');
            closeFormDiv.setAttribute('class', 'zf_lb_closeform_33358');

            var containerDiv = document.createElement("div");
            containerDiv.setAttribute('id', 'containerDiv_33358');
            containerDiv.setAttribute('class', 'zf_lB_Container_33358 ');
            containerDiv.appendChild(iframeDiv);
            containerDiv.appendChild(closeFormDiv);

            var wrapperDiv = document.createElement("div");
            wrapperDiv.setAttribute('class', 'zf_lB_Wrapper_33358');
            wrapperDiv.appendChild(containerDiv);

            var dimmerDiv = document.createElement("div");
            dimmerDiv.setAttribute('class', 'zf_lB_Dimmer_33358');
            dimmerDiv.setAttribute('elname', 'popup_box');

            var mainDiv = document.createElement("div");
            mainDiv.setAttribute('id', 'formsLightBox_33358');
            mainDiv.style.display = "none";
            mainDiv.appendChild(wrapperDiv);
            mainDiv.appendChild(dimmerDiv);

            document.body.appendChild(mainDiv);
        }

        function showZForm_33358() {
            var iframe = document.getElementById("1hrSbylzXXLIPI066zfkq-7DL1R5GwOFvE14szZTM4c_33358").getElementsByTagName("iframe")[0];
            if (iframe == undefined || iframe.length == 0) {
                loadZForm_33358();
            }
            document.getElementById("formsLightBox_33358").style.display = "block";
            document.body.style.overflow = "hidden";
        }

        function loadZForm_33358() {
            var iframe = document.getElementById("1hrSbylzXXLIPI066zfkq-7DL1R5GwOFvE14szZTM4c_33358").getElementsByTagName("iframe")[0];
            if (iframe == undefined || iframe.length == 0) {
                var f = document.createElement("iframe");
                f.src = getsrcurlZForm_33358('https://forms.zohopublic.eu/rosasala/form/RequestademoNUBARTSYNC/formperma/1hrSbylzXXLIPI066zfkq-7DL1R5GwOFvE14szZTM4c');
                f.style.border = "none";
                f.style.minWidth = "100%";
                f.style.overflow = "hidden";
                var d = document.getElementById("1hrSbylzXXLIPI066zfkq-7DL1R5GwOFvE14szZTM4c_33358");
                d.appendChild(f);

                var deleteForm = document.getElementById("deleteform_33358");
                deleteForm.onclick = function deleteZForm_33358() {
                    var divCont = document.getElementById("formsLightBox_33358");
                    divCont.style.display = "none";
                    document.body.style.overflow = "";

                    var iframe = document.getElementById("1hrSbylzXXLIPI066zfkq-7DL1R5GwOFvE14szZTM4c_33358").getElementsByTagName("iframe")[0];
                    iframe.remove();
                }

                window.addEventListener('message', function() {
                    var evntData = event.data;
                    if (evntData && evntData.constructor == String) {
                        var zf_ifrm_data = evntData.split("|");
                        if (zf_ifrm_data.length == 2) {
                            var zf_perma = zf_ifrm_data[0];
                            var zf_ifrm_ht_nw = (parseInt(zf_ifrm_data[1], 10) + 15) + "px";
                            var iframe = document.getElementById("1hrSbylzXXLIPI066zfkq-7DL1R5GwOFvE14szZTM4c_33358").getElementsByTagName("iframe")[0];
                            if ((iframe.src).indexOf('formperma') > 0 && (iframe.src).indexOf(zf_perma) > 0) {
                                var prevIframeHeight = iframe.style.height;
                                if (prevIframeHeight != zf_ifrm_ht_nw) {
                                    iframe.style.minHeight = zf_ifrm_ht_nw;
                                    var containerDiv = document.getElementById("containerDiv_33358");
                                    containerDiv.style.height = zf_ifrm_ht_nw;
                                }
                            }
                        }
                    }
                }, false);
            }
        }

        function getsrcurlZForm_33358(zf_src) {
            try {
                if (typeof ZFAdvLead !== "undefined" && typeof zfutm_zfAdvLead !== "undefined") {
                    for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
                        var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
                        var utmVal = zfutm_zfAdvLead.zfautm_gC_enc(ZFAdvLead.utmPNameArr[prmIdx]);
                        if (typeof utmVal !== "undefined") {
                            if (utmVal != "") {
                                if (zf_src.indexOf('?') > 0) {
                                    zf_src = zf_src + '&' + utmPm + '=' + utmVal;
                                } else {
                                    zf_src = zf_src + '?' + utmPm + '=' + utmVal;
                                }
                            }
                        }
                    }
                }

                if (typeof ZFLead !== "undefined" && typeof zfutm_zfLead !== "undefined") {
                    for (var prmIdx = 0; prmIdx < ZFLead.utmPNameArr.length; prmIdx++) {
                        var utmPm = ZFLead.utmPNameArr[prmIdx];
                        var utmVal = zfutm_zfLead.zfutm_gC_enc(ZFLead.utmPNameArr[prmIdx]);
                        if (typeof utmVal !== "undefined") {
                            if (utmVal != "") {
                                if (zf_src.indexOf('?') > 0) {
                                    zf_src = zf_src + '&' + utmPm + '=' + utmVal;
                                } else {
                                    zf_src = zf_src + '?' + utmPm + '=' + utmVal;
                                }
                            }
                        }
                    }
                }
            } catch (e) {}
            return zf_src;
        }

        var buttonElem = document.getElementById("zf_button_33358");
        buttonElem.style.display = "block";
        buttonElem.addEventListener("click", showZForm_33358);

    } catch (e) {}
})();
