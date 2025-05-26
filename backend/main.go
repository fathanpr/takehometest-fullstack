package main

import "takehometest_golang/routes"

func main() {
	r := routes.SetupRouter()
	r.Run(":8080")
}
