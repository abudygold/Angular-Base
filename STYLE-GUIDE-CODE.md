# Folder Structure Conventions

> Folder structure options and naming conventions for software projects

## Feature Naming

- **Components**: Use `[feature]-[pages]-[component_name]` pattern for create new components.
- **Pages**: Use `[feature]-[page_name]` pattern for create new page.
- **Constants**: Use `[feature]-[file_name].const.ts` pattern for create new constant file.
- **Request Model**: Use `[feature]-req.model.ts (example-req.model.ts)` pattern for create new request model file.
- **Param Request Model**: Use `[feature]-param-req.model.ts (example-param-req.model.ts)` pattern for create new param request model file.
- **Response Model**: Use `[feature].model.ts (example.model.ts)` pattern for create new response model file.
- **Path Const**: Use `[FEATURE]_[NAME]_SERVICE_PATH_CONST (EXAMPLE_LABEL_CONST | EXAMPLE_SERVICE_PATH_CONST)` pattern for create a variable const.

```
├── .vscode (.gitignore)
├── node_modules (.gitignore)
├── src
│   ├── app
│   │   ├── core
│   │   │   ├── auth
│   │   │   │   ├── guard
│   │   │   │   ├── pages
│   │   │   │   │   ├── login
│   │   │   │   │   ├── password-recovery
│   │   │   │   │   └── register
│   │   │   ├── interceptors
│   │   │   │   ├── auth-interceptor.ts
│   │   │   │   └── error-interceptor.ts
│   │   │   ├── layout
│   │   │   │   ├── main-layout
│   │   │   │   └── layout.routes.ts
│   │   │   ├── routing
│   │   │   │   ├── routing.routes.ts
│   │   │   │   └── ...
│   │   ├── feature
│   │   │   ├── example
│   │   │   │   ├── components
│   │   │   │   │   ├── example-form
│   │   │   │   │   ├── example-list-filter
│   │   │   │   │   └── ...
│   │   │   │   ├── pages
│   │   │   │   │   ├── example-create
│   │   │   │   │   ├── example-detail
│   │   │   │   │   ├── example-list
│   │   │   │   │   └── example-update
│   │   │   │   ├── shared
│   │   │   │   │   ├── constants
│   │   │   │   │   │   ├── example-form-config.const.ts
│   │   │   │   │   │   ├── example-table-config.const.ts
│   │   │   │   │   │   └── ...
│   │   │   │   │   ├── model
│   │   │   │   │   │   ├── example-param-req.model.ts
│   │   │   │   │   │   ├── example-req.model.ts
│   │   │   │   │   │   ├── example.model.ts
│   │   │   │   │   │   └── ...
│   │   │   │   │   └── ...
│   │   │   │   └── example.routes.ts
│   │   │   └── not-found
│   │   ├── shared
│   │   │   ├── components
│   │   │   ├── constants
│   │   │   ├── directive
│   │   │   ├── enum
│   │   │   ├── pipes
│   │   │   └── utils
│   │   ├── app-component.spec.ts
│   │   └── app-component.ts
│   ├── environments
│   │   ├── environment.development.ts
│   │   └── environment.ts
│   ├── assets
│   │   ├── icon-list
│   │   │   ├── delete.svg
│   │   │   ├── ...
│   │   │   └── IconList.ts
│   │   └── images
│   ├── styles
│   │   ├── abstracts
│   │   │   ├── _color.scss
│   │   │   └── ...
│   │   ├── base
│   │   │   ├── _font.scss
│   │   │   └── ...
│   │   ├── component
│   │   │   ├── _button.scss
│   │   │   └── ...
│   │   ├── fonts
│   │   │   ├── MaterialIcons
│   │   │   ├── Poppins
│   │   │   ├── Roboto
│   │   │   └── ...
│   │   ├── theme
│   │   │   ├── easy-theme.scss
│   │   │   ├── m3-theme.scss
│   │   │   └── ...
│   │   ├── customize-material.scss
│   │   ├── fonts.scss
│   │   └── style.scss
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
├── ...
```
