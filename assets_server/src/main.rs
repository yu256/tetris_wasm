use axum::Router;
use std::{env, io};
use tower_http::services::ServeDir;

const DEFAULT_PORT: usize = 80;

#[tokio::main]
async fn main() -> io::Result<()> {
    let args = env::args().collect::<Vec<_>>();
    let port = args
        .iter()
        .find(|arg| arg.starts_with("--port="))
        .and_then(|arg| {
            arg.split('=').last().and_then(|arg| {
                arg.parse::<usize>()
                    .inspect_err(|e| {
                        eprintln!("{e}は数値ではありません。{DEFAULT_PORT}ポートを使用します。")
                    })
                    .ok()
            })
        })
        .unwrap_or(DEFAULT_PORT);

    let binding = args.iter().find(|arg| arg.starts_with("--path="));
    let path = binding
        .and_then(|arg| arg.split('=').last())
        .unwrap_or("assets");

    let app = Router::new().nest_service("/", ServeDir::new(path));

    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{port}")).await?;

    println!("Listening on http://localhost:{port}/");

    axum::serve(listener, app).await?;

    Ok(())
}
