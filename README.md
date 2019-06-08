# vul-test
This is a repository for analysis of **vulnerability** ([CVE-2016-10556](https://nvd.nist.gov/vuln/detail/CVE-2016-10556)).

## Preparation
You can toggle the vulnerability on/off by modifying `package.json`.

* on
```
    "sequelize": "3.19.3",
```

* off (default)
```
    "sequelize": "(latest version)",
```

## Usage

* **Initialization**:
```
npm install && npm run setup
```

* **Run app**:
```
node main.js
```

