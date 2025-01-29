package main

import "fmt"

func main() {
	// Значение по умолчанию
	var num0 int

	// Значение при инициализации
	var num1 int = 1

	// Пропуск типа
	var num2 = 20
	fmt.Println(num0, num1, num2)

	// Короткое объявление переменной
	num := 30
	// только для новых переменных
	// no new variables on left side of :=
	// num := 31

	num += 1
	fmt.Println("+=", num)

	// ++num отсутствует
	num++
	fmt.Println("++", num)

	// camelCase - принятый стиль
	userIndex := 10
	//user_score - не принято
	user_index := 10
	fmt.Println(userIndex, user_index)

	//объявление нескольких переменных
	var weight, height int = 10, 20

	// присваивание в существующие переменные
	weight, height = 11, 21

	// короткое присваивание
	// хотя бы одна должна быть новой
	weight, age := 12, 22
	fmt.Println(weight, height, age)
	//////////////////////////////////////////
	// fmt.Println("go" + "lang")

	// fmt.Println("1 + 1 =", 1+1)
	// fmt.Println("7.0/3.0 =", 7.0/3.0)

	// fmt.Println(true && false)
	// fmt.Println(true || false)
	// fmt.Println(!true)

}
