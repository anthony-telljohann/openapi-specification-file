import * as fs from 'async-file'
import * as pathModule from 'path'
import * as SwaggerParser from 'swagger-parser'
import { Spec } from 'swagger-schema-official'

export class OpenAPISpecificationFile {
  constructor(private readonly path) {}
  public exists(): Promise<boolean> {
    return fs.exists(this.path)
  }
  public async parse(): Promise<Spec> {
    return SwaggerParser.YAML.parse(await fs.readFile(this.path))
  }
  public async read(): Promise<Spec> {
    let spec
    try {
      spec = await this.parse()
    } catch {
      spec = null
    }
    return spec
  }
  public async write(spec: Spec): Promise<OpenAPISpecificationFile> {
    await fs.writeTextFile(this.path, SwaggerParser.YAML.stringify(spec))
    return this
  }
  public async delete(): Promise<OpenAPISpecificationFile> {
    await fs.delete(this.path)
    return this
  }
  public async validate(): Promise<Spec> {
    return SwaggerParser.validate(this.path)
  }
  public async isValid(): Promise<boolean> {
    let isValid = true
    try {
      await this.validate()
    } catch {
      isValid = false
    }
    return isValid
  }
  public getName(): string {
    return pathModule.basename(this.path)
  }
  public getDirectory(): string {
    return pathModule.dirname(this.path)
  }
}
