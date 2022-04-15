const myJSON = '{"a[href]": {"tagName": "a","defaultRole": "link","noRoleAllowed": false,"anyRoleAllowed": false,"allowedRoles": ["button","checkbox","menuitem","menuitemcheckbox","menuitemradio","option","radio","switch","tab","treeitem"],"attr1": "href","id": "a[href]"},"a": {"tagName": "a","defaultRole": "generic","noRoleAllowed": false,"anyRoleAllowed": true,"id": "a"}}';
const myObj = JSON.parse(myJSON);
console.log(JSON.stringify(myObj));

