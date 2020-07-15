package main

import (
	"database/sql"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	_ "github.com/mattn/go-sqlite3"
	"todo-app/backend/services"
)

const (
	address = ":8000"
	storage = "storage.db"
	version = "/v1"
)

func main() {
	db := initDB(storage)

	e := echo.New()

	route(e, db)

	e.Start(address)

}

func route(e *echo.Echo, db *sql.DB) {
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:8080", "http://127.0.0.1:8080", "*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.GET(version+"/tasks", services.GetTasks(db))
	e.GET(version+"/tasks/:id", services.GetTask(db))
	e.PUT(version+"/tasks/:id", services.PutTask(db))
	e.POST(version+"/tasks", services.PostTask(db))
	e.DELETE(version+"/tasks/:id", services.DeleteTask(db))
}

func initDB(filePath string) *sql.DB {
	db, err := sql.Open("sqlite3", filePath)

	if err != nil {
		panic(err)
	}

	if db == nil {
		panic("db interface - error")
	}

	migrate(db)

	return db
}

func migrate(db *sql.DB) {
	sql := `
    CREATE TABLE IF NOT EXISTS tasks(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        title VARCHAR NOT NULL,
		description TEXT NOT NULL,
		tags VARCHAR DEFAULT NULL,
		status VARCHAR DEFAULT NULL,
		date DATE 
    );
    `

	_, err := db.Exec(sql)
	// Exit if something goes wrong with our SQL statement above
	if err != nil {
		panic(err)
	}
}
