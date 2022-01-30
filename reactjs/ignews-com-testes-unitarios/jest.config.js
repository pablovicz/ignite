module.exports ={
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    /** 
     *  [^] -> todo arguivo que começa
     *  [.] -> qualquer caracter
     *  [+] -> tendo um ou mais caracteres no nome
     *  [\\.] -> ponto como caracter
     *  [$] -> terminam com as extenoes
     * */
    },
    moduleNameMapper: {
        "\\.(scss|css|sass)$": "identity-obj-proxy" //yarn add identity-obj-proxy -D
    },
    testEnvironment: 'jsdom'
}