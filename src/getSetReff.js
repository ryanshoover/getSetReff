function getSetReff() {

    // Array.filter() isn't included in IE until version 9.
    if ( !Array.prototype.filter ) {
        Array.prototype.filter = function ( fun /*, thisArg */ ) {
            "use strict";

            if ( this === void 0 || this === null )
                throw new TypeError();

            var t = Object( this );
            var len = t.length >>> 0;
            if ( typeof fun !== "function" )
                throw new TypeError();

            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[ 1 ] : void 0;
            for ( var i = 0; i < len; i++ ) {
                if ( i in t ) {
                    var val = t[ i ];

                    // NOTE: Technically this should Object.defineProperty at
                    //       the next index, as push can be affected by
                    //       properties on Object.prototype and Array.prototype.
                    //       But that method's new, and collisions should be
                    //       rare, so use the more-compatible alternative.
                    if ( fun.call( thisArg, val, i, t ) )
                        res.push( val );
                }
            }

            return res;
        };
    }

    // Read cookie.
    function rC( k ) {
        return ( document.cookie.match( '(^|; )' + k + '=([^;]*)' ) || 0 )[ 2 ]
    }

    // Set cookie.
    function sC( n, v, d ) {
        dd = new Date();

        dd.setTime( dd.getTime() + ( d * 24 * 60 * 60 * 1000 ) );

        e = typeof d != "undefined" ? ";expires=" + dd.toGMTString() : "";

        document.cookie = n + "=" + v + e + ";domain=" + _reff[ 0 ].setDomain + ";path=/";
    }

    // Get value from path.
    function gcP( p ) {
        if ( document.location.search.indexOf( p ) != -1 ) {
            return ( "" + document.location.search.split( p + "=" )[ 1 ] ).split( "&" )[ 0 ];
        } else {
            return "not-set";
        }
    }

    // Variable setup.
    var maxCookieSize = maxCookieSize || 2048; // Maximum size of the cookie, in bytes/characters.
    var __asc = ( typeof rC( "__sreff" ) != "undefined" ? rC( "__sreff" ) : "" );
    var __apc = ( typeof rC( "__reff" ) != "undefined" ? rC( "__reff" ) : "" );
    var __tsc = t__apc = [];
    var __rf = __tpc = res__apc = __gsr = __nwss = "";
    var __cmp = "utm_campaign";
    var __mdm = "utm_medium";
    var __srcs = "utm_source";
    var __term = "utm_term";
    var __cont = "utm_content";
    var _reff = [];

    _reff = dataLayer.filter( function ( value ) {
        if ( value.setDomain ) return value;
    } );

    if ( _reff.length === 0 ) _reff[ 0 ] = {
        'setDomain': document.location.hostname
    };

    // Ensure the __reff cookie doesn't get too large
    // We're setting a maximum cookie size of 2KB, or 1/2 the absolute maximum of 4096 for most browsers
    __apc = maxCookieSize < __apc.length ?
        __apc.substr( __apc.indexOf( '|', __apc.length - maxCookieSize ) + 1, __apc.length ) :
        __apc;

    // Referrer or params?
    if ( document.location.search.indexOf( __cmp ) != -1 ||
        document.location.search.indexOf( __mdm ) != -1 ||
        document.location.search.indexOf( __srcs ) != -1 ||
        document.location.search.indexOf( __term ) != -1 ||
        document.location.search.indexOf( __cont ) != -1 ) {
        __gsr = "//campaign::c:[" + gcP( __cmp ) + "]m:[" + gcP( __mdm ) + "]s:[" + gcP( __srcs ) + "]t:[" + gcP( __term ) + "]cn:[" + gcP( __cont ) + "]";
    } else {
        __gsr = document.referrer;
    }

    // Get referrer domain & verify adwords
    __gsr = ( ( document.location.search.indexOf( "gclid" ) != -1 ) ? "//campaign::[adwords]" : __gsr );
    __gsr = ( ( typeof __gsr == "undefined" || __gsr == "" || __gsr.indexOf( _reff[ 0 ].setDomain ) != -1 ) ? "(direct)" : __gsr.split( '/' )[ 2 ] );

    if ( __asc ) {
        __tsc = __asc.split( "." );
        __tsc[ 1 ] = new Date().getTime();
        __tsc[ 2 ]++;
        __asc = __tsc.join( "." );
        sC( "__sreff", __asc );
    } else {
        __tsc[ 0 ] = __tsc[ 1 ] = new Date().getTime(); //start time = current time
        __tsc[ 2 ] = 1; //first pageview
        __asc = __tsc.join( "." );
        __nwss = 1;
        sC( "__sreff", __asc );
    }

    // If new session
    if ( __nwss == 1 ) {
        res__apc = ( __apc != "" ? __apc + "|" : "" );
        sC( "__reff", res__apc + __gsr + "&" + __asc, 730 );
    } else {
        t__apc = __apc.split( "|" );
        __tpc = t__apc[ t__apc.length - 1 ];
        __tpc = __tpc.split( "&" )[ 0 ] != "" ? __tpc.split( "&" )[ 0 ] : __gsr;
        res__apc = ( t__apc.length == 1 ? "" : ( t__apc.slice( 0, -1 ).join( "|" ) + "|" ) );

        if ( __gsr == "(direct)" || __gsr.indexOf( __tpc.split( "&" )[ 0 ] ) != -1 ) {
            sC( "__reff", res__apc + __tpc + "&" + __asc, 730 );
        } else {
            sC( "__reff", __apc + "|" + __gsr + "&" + __asc, 730 );
        }
    }

    return rC( "__reff" );
}
