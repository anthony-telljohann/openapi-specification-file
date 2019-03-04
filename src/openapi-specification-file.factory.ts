import * as pathModule from 'path'
import { OpenAPISpecificationFile } from './openapi-specification-file'
export class OpenApiSpecificationFileFactory {
  public static create(
    path: string = 'openapi-spec.yaml'
  ): OpenAPISpecificationFile {
    return new OpenAPISpecificationFile(pathModule.resolve(path))
  }
}
