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
var graphql_1 = require("graphql");
var React = require("react");
var TypeLink_1 = require("./TypeLink");
var styled_1 = require("../../../styled");
exports.default = function (_a) {
  var type = _a.type,
      fields = _a.fields,
      interfaces = _a.interfaces,
      level = _a.level;
  var nonDeprecatedFields = fields.filter(function (data) {
    return !data.isDeprecated;
  });
  var deprecatedFields = fields.filter(function (data) {
    return data.isDeprecated;
  });
  var typeInstance = type instanceof graphql_1.GraphQLInterfaceType ? 'interface ' : 'type';
  return React.createElement(
    DocTypeSchema,
    null,
    React.createElement(
      DocTypeLine,
      null,
      React.createElement(
        "span",
        { className: "field-name" },
        typeInstance
      ),
      ' ',
      React.createElement(
        DocsTypeName,
        null,
        type.name
      ),
      ' ',
      interfaces.length === 0 && React.createElement(
        Brace,
        null,
        "{"
      )
    ),
    interfaces.map(function (data, index) {
      return React.createElement(DocsTypeInferface, { key: data.name, type: data, x: level, y: index, collapsable: true, beforeNode: React.createElement(
          "span",
          { className: "field-name" },
          "implements"
        ), afterNode: index === interfaces.length - 1 ? React.createElement(
          Brace,
          null,
          '{'
        ) : null, lastActive: false });
    }),
    nonDeprecatedFields.map(function (data, index) {
      return React.createElement(TypeLink_1.default, { key: data.name, type: data, x: level, y: index + interfaces.length, collapsable: true, lastActive: false });
    }),
    deprecatedFields.length > 0 && React.createElement("br", null),
    deprecatedFields.map(function (data, index) {
      return React.createElement(
        "div",
        { key: data.name },
        React.createElement(
          DocsValueComment,
          null,
          "# Deprecated: ",
          data.deprecationReason
        ),
        React.createElement(TypeLink_1.default, { type: data, x: level, y: index + nonDeprecatedFields.length + interfaces.length, collapsable: true, lastActive: false })
      );
    }),
    React.createElement(
      DocTypeLine,
      null,
      React.createElement(
        Brace,
        null,
        '}'
      )
    )
  );
};
var DocTypeSchema = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 14px;\n  overflow: auto;\n  .doc-category-item {\n    padding-left: 32px;\n  }\n"], ["\n  font-size: 14px;\n  overflow: auto;\n  .doc-category-item {\n    padding-left: 32px;\n  }\n"])));
var DocTypeLine = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 6px 16px;\n  white-space: nowrap;\n"], ["\n  padding: 6px 16px;\n  white-space: nowrap;\n"])));
var DocsTypeName = styled_1.styled.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: #f25c54;\n"], ["\n  color: #f25c54;\n"])));
var DocsTypeInferface = styled_1.styled(TypeLink_1.default)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding-left: 16px;\n  .field-name {\n    color: rgb(245, 160, 0);\n  }\n  .type-name {\n    color: #f25c54;\n  }\n"], ["\n  padding-left: 16px;\n  .field-name {\n    color: rgb(245, 160, 0);\n  }\n  .type-name {\n    color: #f25c54;\n  }\n"])));
var DocsValueComment = styled_1.styled.span(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  color: ", ";\n  padding-right: 16px;\n  padding-left: 32px;\n"], ["\n  color: ", ";\n  padding-right: 16px;\n  padding-left: 32px;\n"])), function (p) {
  return p.theme.colours.black50;
});
var Brace = styled_1.styled.span(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-weight: 600;\n  color: ", ";\n"], ["\n  font-weight: 600;\n  color: ", ";\n"])), function (p) {
  return p.theme.colours.darkBlue50;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=DocTypeSchema.jsx.map