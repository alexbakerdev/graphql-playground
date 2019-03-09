"use strict";

var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var stack_1 = require("./stack");
var utils_1 = require("../../../utils");
var defaultTypes = ['__Schema', '__Directive', '__DirectiveLocation', '__Type', '__Field', '__InputValue', '__EnumValue', '__TypeKind', 'String', 'ID', 'Boolean', 'Int', 'Float'];
/* Creates an array of SchemaTypes for the SDLFieldDocs
(A component that is similar to the DocsExplorer) to consume */
function sdlArray(schema, options) {
    var objectValues = Object.values || function (obj) {
        return Object.keys(obj).map(function (key) {
            return obj[key];
        });
    };
    var typeMap = schema.getTypeMap();
    var types = objectValues(typeMap).sort(function (type1, type2) {
        return type1.name.localeCompare(type2.name);
    }).filter(function (type) {
        return !defaultTypes.includes(type.name);
    }).map(function (type) {
        return __assign({}, type, stack_1.serialize(schema, type), { instanceOf: getTypeInstance(type) });
    });
    return types;
}
exports.sdlArray = sdlArray;
function getTypeInstance(type) {
    if (type instanceof graphql_1.GraphQLInterfaceType) {
        return 'interface';
    } else if (type instanceof graphql_1.GraphQLUnionType) {
        return 'union';
    } else if (type instanceof graphql_1.GraphQLEnumType) {
        return 'enum';
    } else if (type instanceof graphql_1.GraphQLInputObjectType) {
        return 'input';
    } else {
        return 'type';
    }
}
// Adds Line Breaks to Schema View
function addLineBreaks(sdl, commentsDisabled) {
    if (commentsDisabled === void 0) {
        commentsDisabled = true;
    }
    var noNewLines = sdl.replace(/^\s*$(?:\r\n?|\n)/gm, '');
    // Line Break all Brackets
    var breakBrackets = noNewLines.replace(/[}]/gm, '$&\r\n');
    // Line Break all Scalars
    var withLineBreaks = breakBrackets.replace(/(?:scalar )\w+/g, '$&\r\n');
    if (commentsDisabled) {
        return withLineBreaks;
    }
    // Special Line Breaking for Comments
    var withCommentLineBreaks = withLineBreaks.replace(/(?:\#[\w\'\s\r\n\*](.*)$)/gm, '$&\r');
    return withCommentLineBreaks;
}
// Returns a prettified schema
function getSDL(schema, commentsDisabled) {
    if (commentsDisabled === void 0) {
        commentsDisabled = true;
    }
    if (schema instanceof graphql_1.GraphQLSchema) {
        var rawSdl = graphql_1.printSchema(schema, { commentDescriptions: true });
        if (commentsDisabled) {
            // Removes Comments but still has new lines
            var sdlWithNewLines = rawSdl.replace(/(\#[\w\'\s\r\n\*](.*)$)/gm, '');
            // Removes newlines left behind by Comments
            var sdlWithoutComments = utils_1.prettify(sdlWithNewLines, {
                printWidth: 80,
                tabWidth: 2,
                useTabs: false
            });
            return addLineBreaks(sdlWithoutComments, commentsDisabled);
        }
        var sdl = utils_1.prettify(rawSdl, {
            printWidth: 80,
            tabWidth: 2,
            useTabs: false
        });
        return addLineBreaks(sdl);
    }
    return '';
}
exports.getSDL = getSDL;
// Downloads the schema in either .json or .graphql format
function downloadSchema(schema, type) {
    if (type === 'sdl') {
        var data = getSDL(schema, false);
        var filename = 'schema.graphql';
        return download(data, filename);
    } else {
        var data = JSON.stringify(schema);
        var filename = 'instrospectionSchema.json';
        return download(data, filename);
    }
}
exports.downloadSchema = downloadSchema;
// Performant option for downloading files
function download(data, filename, mime) {
    var blob = new Blob([data], { type: mime || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}
//# sourceMappingURL=createSDL.js.map