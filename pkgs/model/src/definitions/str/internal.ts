import { StringifyPossibleTypes, Split, Join } from "@re-/tools"
import { ParseConfig, ValidationErrorMessage } from "../internal.js"
import { Str } from "./str.js"

export * from "../internal.js"

export type CheckSplittable<
    Delimiter extends string,
    Def extends string,
    Root extends string,
    Space,
    Components extends string[] = Split<Def, Delimiter>,
    ValidateDefinitions extends string[] = {
        [Index in keyof Components]: Str.Check<
            Components[Index] & string,
            Components[Index] & string,
            Space
        >
    },
    ValidatedDefinition extends string = Join<ValidateDefinitions, Delimiter>
> = Def extends ValidatedDefinition
    ? Root
    : StringifyPossibleTypes<
          Extract<
              ValidateDefinitions[keyof ValidateDefinitions],
              ValidationErrorMessage
          >
      >

export type ParseSplittable<
    Delimiter extends string,
    Def extends string,
    Space,
    Options extends ParseConfig,
    Components extends string[] = Split<Def, Delimiter>
> = {
    [I in keyof Components]: Str.Parse<Components[I] & string, Space, Options>
}
