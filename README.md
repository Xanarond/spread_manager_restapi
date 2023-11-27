Проект взаимодействует с API Binance, Bybit, Kucoin, OKX  для получения информации о криптовалютных курсах, а также для получения информации в рамках P2P-сделок. Давайте разберемся с основными аспектами и функционалом проекта на примере Binance:
### Структура проекта:

1. **BinanceController:**
		- Контроллер, обрабатывающий HTTP-запросы, поступающие на эндпоинты `/binance`.
		- Предоставляет методы для получения курсов валют, поиска сделок P2P, и других операций.

```typescript
@Controller('binance')
export class BinanceController {
  // ...
}
```

2. **BinanceService:**
		- Сервис, содержащий бизнес-логику приложения, включая взаимодействие с Binance API.
		- Предоставляет методы для получения курсов валют, выполнения поиска сделок P2P и других операций.

```typescript
@Injectable()
export class BinanceService {
  // ...
}
```

3. **Entities и DTO:**
		- В коде присутствуют сущности (Entities) и Data Transfer Objects (DTO), такие как `BinanceBidEntity`, `UserBid`, `CurrencyDto`, которые определяют структуру данных, используемую в проекте.

```typescript
import { BinanceBidEntity } from './entities/bidsreq.entity';
import UserBid from './dto/userbid.dto';
import CurrencyDto from '../dto/currency.dto';
```

### Основной функционал:

1. **Получение курсов валют:**
		- `getCurrency()` метод в `BinanceService` выполняет запрос к API Binance для получения актуальных курсов валют.

```typescript
getCurrency(): Observable<CurrencyDto[]> {
  // ...
}
```

2. **Поиск сделок P2P:**
		- `postUserBid` метод в `BinanceService` отправляет POST-запрос к Binance API для поиска сделок P2P на основе переданных данных.

```typescript
postUserBid(Bid: BinanceBidEntity): Observable<UserBid> {
  // ...
}
```

3. **Генерация запросов для различных вариантов параметров:**
		- `postReformatObj` метод в `BinanceService` генерирует массив запросов для различных комбинаций параметров.

```typescript
async postReformatObj(sum: string): Promise<Observable<UserBid[]>> {
  // ...
}
```

### Дополнительные аспекты:

- Весь проект использует TypeScript, что улучшает читаемость кода и предоставляет статическую типизацию.
- Взаимодействие с API осуществляется с использованием `HttpService` из NestJS.
- Весь код описан с использованием декораторов и функций из библиотеки RxJS для удобства работы с асинхронными операциями.
- Проект также включает в себя документацию к API с использованием Swagger декораторов.
- Пример развернутого приложения находится на http://92.63.98.23:8000/docs/

---

The project interacts with the APIs of Binance, Bybit, Kucoin, OKX to obtain information about cryptocurrency rates, as well as to obtain information as part of P2P transactions. Let's look at the main aspects and functionality of the project using Binance as an example:

### Project structure:

1. **BinanceController:**
	- is a controller that processes HTTP requests received at the `/binance` endpoints.
	- Provides methods for obtaining exchange rates, searching for P2P transactions, and other operations.

```typescript
@Controller('binance')
export class BinanceController {
  // ...
}
```

2. **BinanceService:**
- A service containing the business logic of the application, including interaction with the Binance API.
- Provides methods for obtaining exchange rates, searching for P2P transactions and other operations.

```typescript
@Injectable()
export class BinanceService {
  // ...
}
```

3. **Entities and DTO:**
- The code contains Entities and data transfer objects (DTO), such as "BinanceBidEntity", "UserBid", "CurrencyDto", which are used to structure the data that is used in the project.

```typescript
imports {BinanceBidEntity } from './entities/bidsreq.entity';
imports a usbid from './dto/usbid.dto';
imports CurrencyDto from '../dto/currency.dto';
```
### Basic functionality:

1. **Getting exchange rates:**
- `getCurrency()` the method in `BinanceService` executes a request to the Binance API to get the current exchange rates.
```typescript
getCurrency(): Observable<CurrencyDto[]> {
  // ...
}
```

2. **P2P Transaction Search:**
- The `postUserBid` method in `BinanceService` sends a POST request to the Binance API to search for P2P transactions based on the transmitted data.
```typescript
postUserBid(Bid: BinanceBidEntity): Observable<UserBid> {
  // ...
}
```

3. **Generating queries for various parameter options:**
	- The `postReformatObj` method in `BinanceService` generates an array of requests for various combinations of parameters.
```typescript
async postReformatObj(sum: string): Promise<Observable<UserBid[]>> {
  // ...
}
```
### Additional aspects:
- The whole project uses TypeScript, which improves code readability and provides static typing.
- The entire code is described using decorators and functions from the RxJS library for ease of working with asynchronous operations.
- The project also includes API documentation using Swagger decorators.
- An example of a deployed application is on http://92.63.98.23:8000/docs/
