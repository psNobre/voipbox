"use strict";

module.exports = {
    hostname: "0.0.0.0",
    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: "sessionSecret",

    // The name of the MongoDB collection to store sessions in
    sessionCollection: "sessions", 

    // The session cookie settings
    sessionCookie: { 
    	path: "/",
    	httpOnly: true,
    	// If secure is set to true then it will cause the cookie to be set
    	// only when SSL-enabled (HTTPS) is used, and otherwise it won't
    	// set a cookie. 'true' is recommended yet it requires the above
    	// mentioned pre-requisite.
    	secure: false,
    	// Only set the maxAge to null if the cookie shouldn't be expired
    	// at all. The cookie will expunge when the browser is closed.
    	maxAge:  10 * 12 * 30 * 24 * 60 * 60 * 1000
    },

    // The session cookie name
    sessionName: "sessionName.sid",

    asterisk:{
        host: "127.0.0.1",
        port: 5038,
        username: "admin",
        password: "segredo123",
        events: true
    },

    mongo:{
        db: "voipbox_db",
        host: "mongodb://127.0.0.1/",
        port: null,
        username: "voipbox",
        password: "segrendo456"

    },

    ldap:{

        url: 'ldap://127.0.0.1:389',
        dc: 'dc=exemplo,dc=com,dc=br',
        active : true,
        /* baseLdap consiste nas informações necessárias para login com a base
        geral do LDAP.  O mesmo consiste com os cmapos 'bindSufix', atributo responsável
        pelo o bind com o DN do LDAP Geral e o 'password'. */
        baseLdap: {
            bindSufix: 'cn=user,dc=exemplo,dc=com,dc=br',
            password: 'segredo789'

        },

        /* userLdap consiste nas informações necessárias para login com usuário
        na base LDA. O mesmo consiste com os cmapos 'bindSufix', ou seja, atributo responsável
        pelo o bind com o ramo do LDAP responsável por guardar registro de todos os usuários.*/
        userLdap: {
            bindSufix: 'ou=funcionarios,dc=exemplo,dc=com,dc=br'
        },

        /* O campo de configuração authList serve para determinar a autoridade de um determinado
        grupo do LDAP. O objeto consiste de 3 propriedades:
        'active' propriedade esta responsável por admitir o uso de filtor por gurpo ou não.
             valores possíveis: 'false' ou 'true'
         'memberFilter' campo resposável pelo DN do grupo na base LDAP
         'powerAuthority' responsável por delegar ao grupo que tipo de autoridade ele tem.
         valores possíveis: 'administrator' ou 'standard' */
         authList: {
            active : false,
            memberFilter: 'cn=funcionarios_admin,ou=funcionarios,dc=exemplo,dc=com,dc=br',
            powerAuthority: 'administrator'
        }

    }
};
