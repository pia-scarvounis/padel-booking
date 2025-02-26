export default {
    transform: {"^.+\\.[t|j]sx?$": "babel-jest"},
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "json", "node"],
    transformIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
  };
  

  
  
  
  