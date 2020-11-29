var unblock_tvb = {};  // namespace
unblock_tvb.ip_addr  = "44.34.178.";
unblock_tvb.ip_addr += Math.floor(Math.random() * 254 + 1); // 1 ~ 254
console.log('faked ip addr: ' + unblock_tvb.ip_addr);

chrome.webRequest.onBeforeSendHeaders.addListener(
    // callback function
    function(details) {
        details.requestHeaders.push({
            name: "X-Forwarded-For",
            value: unblock_tvb.ip_addr
        });

        return {requestHeaders: details.requestHeaders};
    },

    // url filters
    {
        urls: [
            "https://edge.api.brightcove.com/playback/v1/accounts/5324042807001/*"
        ]
    },

    // extraInfoSpec
    // the request is blocked until the callback function returns
    ["requestHeaders", "blocking"]);
