check github issues tab.

## REQUIREMENTS
1. You will need [bun](https://bun.sh/docs/installation). 
```
npm install -g bun
```
2. Need [rustup/cargo](https://www.rust-lang.org/tools/install)

## RUN COMMANDS
**FRONT END**
```
cd svelte-frontend
bun run dev
```
**BACK END**
```
cd rs-server
cargo run
```
## THINGS TO KNOW

Ask an LLM to explain these to you tbh.

SVELTE (probably more important)
- [svelte tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) similar to rustlings but for svelte.
- [svelte docs](https://svelte.dev/docs/svelte/overview) good for reference.

RUST (not as important because backend is mostly done for now)
- [rust book](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html) good refernce
- [rust by example](https://doc.rust-lang.org/rust-by-example/) lots of examples good
- [rustlings](https://github.com/rust-lang/rustlings) very good to learn rust but takes a few days. If you want to learn rust I reccomend it.
- [async rust](https://rust-lang.github.io/async-book/) async rust programming. might be worth to read a little.

Rust crates we are using are axum (for routing), tokio (needed for async), serde, serde_json (needed for json parsing). There is a few other crates but not as important.

