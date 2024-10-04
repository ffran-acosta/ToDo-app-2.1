bash commands:
pnpm add express mongoose dotenv jsonwebtoken bcryptjs
pnpm add -D typescript ts-node @types/node @types/express nodemon
npx tsc --init
pnpm add -D tsconfig-paths

tsconfig.json:
{
  "compilerOptions": {
    "baseUrl": "./",               // Define el directorio raíz del proyecto
    "paths": {
      "@/*": ["src/*"]              // Alias '@' que apunta a la carpeta 'src'
    },
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}

run sv:
"scripts": {
  "dev": "nodemon --exec ts-node -r tsconfig-paths/register src/index.ts"
}