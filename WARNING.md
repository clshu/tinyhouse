## AppHeader warning

### I encountered this warning during the course of studying Part 2 module 4.8 Building the App Header & Logout. Everything seems to work as extected except this warning.

### I copied and past most codes except some differencies.

#

### 1. export \* from './Abc' is broken. It seems to be some bug in @typescript/eslint-parser. I worked around it with 'export {Abc} from './Abc'.

### 2. Icon is refactor to different package. So I use

### import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'

#

### Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

### Check the render method of `ResizeObserver`.

### in AppHeader (at src/index.tsx:39)

### in ResizeObserver (created by Context.Consumer)

### in div (created by Context.Consumer)

### in div (created by ResizeObserver)

### in ResizeObserver (created by Context.Consumer)

### in Affix (at src/index.tsx:38)

### in Router (created by BrowserRouter)

### in BrowserRouter (at src/index.tsx:37)

### in App (at src/index.tsx:60)

### in ApolloProvider (at src/index.tsx:59)
