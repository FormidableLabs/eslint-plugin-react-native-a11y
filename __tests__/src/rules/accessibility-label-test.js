/* eslint-env jest */
/**
 * @fileoverview Enforce that views that have accessible={true}, also have an accessibilityLabel prop
 * @author Alex Saunders
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from "eslint";
import parserOptionsMapper from "../../__util__/parserOptionsMapper";
import rule from "../../../src/rules/accessibility-label";

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message:
    "If an element adopts the accessible={true} prop, it (or at least one of its children) must also set the accessibilityLabel prop",
  type: "JSXOpeningElement"
};

ruleTester.run("accessibility-label", rule, {
  valid: [
    {
      code: '<View accessible={true} accessibilityLabel={"Tap me!"}/>'
    },
    {
      code: '<View accessible={true} accessibilityLabel="Tap me!"/>'
    },
    {
      code:
        '<View accessible={true}><Text accessibilityLabel="Tap me!">Button</Text></View>'
    },
    {
      code: `
        <View accessible={true} accessibilityLabel="Tap me!">
          <View>
            <Text acessibilityLabel={"Tap me!"}>Button</Text>
          </View>
        </View>`
    }
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: "<View accessible={true} />",
      errors: [expectedError]
    },
    {
      code: "<View accessible={true} accessibilityLabel/>",
      errors: [expectedError]
    },
    {
      code: '<View accessible={true} accessibilityLabel=""/>',
      errors: [expectedError]
    },
    {
      code: '<View accessible={true} accessibilityLabel={""}/>',
      errors: [expectedError]
    },
    {
      code: "<View accessible={true} />",
      errors: [expectedError]
    },
    {
      code: `
      <View accessible={true}>
        <View>
          <Text>Button</Text>
        </View>
      </View>`,
      errors: [expectedError]
    }
  ].map(parserOptionsMapper)
});
