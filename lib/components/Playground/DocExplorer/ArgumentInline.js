"use strict";

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphql_1 = require("graphql");
var styled_1 = require("../../../styled");
function Argument(_a) {
    var arg = _a.arg,
        showDefaultValue = _a.showDefaultValue;
    return React.createElement(
        ArgumentLine,
        null,
        React.createElement(
            "span",
            { className: "arg-name" },
            arg.name
        ),
        ': ',
        React.createElement(
            "span",
            { className: "type-name" },
            renderType(arg.type)
        ),
        arg.defaultValue !== undefined && showDefaultValue !== false && React.createElement(
            "span",
            null,
            ' = ',
            React.createElement(
                "span",
                { className: "arg-default-value" },
                graphql_1.print(graphql_1.astFromValue(arg.defaultValue, arg.type))
            )
        )
    );
}
exports.default = Argument;
function renderType(type) {
    if (type instanceof graphql_1.GraphQLNonNull) {
        return React.createElement(
            "span",
            null,
            renderType(type.ofType),
            '!'
        );
    }
    if (type instanceof graphql_1.GraphQLList) {
        return React.createElement(
            "span",
            null,
            '[',
            renderType(type.ofType),
            ']'
        );
    }
    return React.createElement(
        "span",
        null,
        type.name
    );
}
var ArgumentLine = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-left: 16px;\n"], ["\n  margin-left: 16px;\n"])));
var templateObject_1;
//# sourceMappingURL=ArgumentInline.jsx.map