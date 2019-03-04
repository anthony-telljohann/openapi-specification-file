import * as pathModule from 'path'
import { OpenAPISpecificationFile, OpenApiSpecificationFileFactory } from '.'
import { invalidSpec } from './fixtures/invalid-openapi-spec.fixture'
import { validSpec } from './fixtures/valid-openapi-spec.fixture'

describe(`OpenAPI specification file`, () => {
  let specFile: OpenAPISpecificationFile
  const DEFAULT_PATH = `openapi-spec.yaml`
  beforeEach(() => {
    specFile = OpenApiSpecificationFileFactory.create(DEFAULT_PATH)
  })
  afterAll(() => {
    specFile.delete()
  })
  describe(`Feature: construct OpenAPISpecificationFile`, () => {
    describe(`When the User constructs an OpenAPISpecificationFile`, () => {
      beforeEach(() => {
        specFile = OpenApiSpecificationFileFactory.create()
      })
      describe(`Then the OpenAPISpecificationFile`, () => {
        it(`should have a name`, () => {
          expect(specFile.getName()).toBeDefined()
        })
        it(`should have a directory`, () => {
          expect(specFile.getDirectory()).toBeDefined()
        })
        describe('And the Name', () => {
          it(`should be "openapi-spec.yaml"`, () => {
            expect(specFile.getName()).toBe(DEFAULT_PATH)
          })
        })
        describe('And the Directory', () => {
          it('should be the absolute path of the current working directory', () => {
            expect(specFile.getDirectory()).toBe(pathModule.resolve())
          })
        })
      })
    })
    describe(`Given the User specifies a path`, () => {
      let path: string
      beforeEach(() => {
        path = 'foo/bar-spec.yaml'
      })
      describe(`When the User constructs an OpenAPISpecificationFile`, () => {
        beforeEach(() => {
          specFile = OpenApiSpecificationFileFactory.create(path)
        })
        describe(`Then the OpenAPISpecificationFile`, () => {
          it(`should have a name`, () => {
            expect(specFile.getName()).toBeDefined()
          })
          it(`should have a directory`, () => {
            expect(specFile.getDirectory()).toBeDefined()
          })
          describe('And the Name', () => {
            it(`should be the basename of the User's path`, () => {
              expect(specFile.getName()).toBe(pathModule.basename(path))
            })
          })
          describe('And the Directory', () => {
            it(`should be the directory name of the User's resolved path`, () => {
              expect(specFile.getDirectory()).toBe(
                pathModule.dirname(pathModule.resolve(path))
              )
            })
          })
        })
      })
    })
  })
  describe(`Feature: write OpenAPI specification file`, () => {
    describe(`When the User writes the OpenAPI specification file`, () => {
      beforeEach(() => specFile.write(validSpec))
      describe(`Then the OpenAPI Specification File`, () => {
        it('should exist', async () => {
          expect(await specFile.exists()).toBe(true)
        })
        it(`should be valid`, async () => {
          expect(await specFile.isValid()).toBe(true)
        })
      })
    })
  })
  describe(`Feature: read OpenAPI specification file`, () => {
    describe(`Given the OpenAPI specification file exists`, () => {
      beforeEach(() => specFile.write(validSpec))
      describe(`When the User reads the OpenAPI specification file`, () => {
        describe(`Then the User`, () => {
          it('should get the OpenAPI specification', async () => {
            expect(await specFile.read()).toEqual(validSpec)
          })
        })
      })
    })
    describe(`Given the OpenAPI specification file does not exist`, () => {
      beforeEach(() => specFile.delete())
      describe(`When the User reads the OpenAPI specification file`, () => {
        describe(`Then the User`, () => {
          it('should get null', async () => {
            expect(await specFile.read()).toBeNull()
          })
        })
      })
    })
  })
  describe(`Feature: delete OpenAPI specification file`, () => {
    describe(`Given the OpenAPI specification file exists`, () => {
      beforeEach(() => specFile.write(validSpec))
      describe(`When the User deletes the OpenAPI specification file`, () => {
        beforeEach(() => specFile.delete())
        describe(`Then the OpenAPI specification file`, () => {
          it('should not exist', async () => {
            expect(await specFile.exists()).toEqual(false)
          })
        })
      })
    })
  })
  describe(`Feature: check existence of OpenAPI specification file`, () => {
    describe(`Given the OpenAPI specification file exists`, () => {
      beforeEach(() => specFile.write(validSpec))
      describe(`When the User checks existence of the OpenAPI specification file`, () => {
        describe(`Then the User`, () => {
          it('should get true', async () => {
            expect(await specFile.exists()).toEqual(true)
          })
        })
      })
    })
  })
  describe(`Feature: check validity of OpenAPI specification file`, () => {
    describe(`Given the OpenAPI specification file exists`, () => {
      beforeEach(() => specFile.write(validSpec))
      describe(`When the User checks validity of the OpenAPI specification file`, () => {
        describe(`Then the User`, () => {
          it('should get true', async () => {
            expect(await specFile.isValid()).toEqual(true)
          })
        })
      })
    })
    describe(`Given an invalid OpenAPI specification file exists`, () => {
      beforeEach(() => specFile.write(invalidSpec))
      describe(`When the User checks validity of the OpenAPI specification file`, () => {
        describe(`Then the User`, () => {
          it('should get false', async () => {
            expect(await specFile.isValid()).toBe(false)
          })
        })
      })
    })
  })
})
