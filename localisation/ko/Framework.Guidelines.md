# 프레임워크 가이드라인 Framework Guidelines #

## `System` 네임스페이스의 타입보다는 C# 타입 앨러어스를 사용 ![](imgs/must.png) ##

예를 들어, `Object`보다는 `object`를, `String`보다는 `string`을, `Int32`보다는 `int`를 사용한다. 이런 앨리어스들은 기본 데이터 타입을  C# 언어의 1등급시민으로 만들기 위해 도임되었기에 후자를 쓰는 것이 좋다.

![EXCEPTION](imgs/exception.png) 이 타입들의 정적 멤버들을 가리킬 때는, 전체 CLS 이름을 사용하도록 커스텀한다, 예) `int.Parse()`보다는 `Int32.Parse()`.


## 다국어 지원을 위한 적절한 이름의 속성/변수/필드 ![](imgs/may.png) ##

에러 메시지들이나 메뉴 텍스트같은 다국어 지원이 필요한 자원에 적용할 가이드라인

* 자원의 키값은 파스칼 표기법을 사용
* 짧은 인식자보다는 서술형으로 제공한다. 가능하면 명료하게 유지하면 좋지만, 가독성을 희생하지는 마라.
* 자원의 이름으로는 알파벳 글자만 사용한다.

## 배포 환경에 대한 스트링은 하드코딩하지마라 ![](imgs/may.png) ##

예를 들어 서버 주소같은 것들은 `ConfigurationManager` 클래스의 `ConnectionStrings` 속성같은 `Resources`를 사용하거나 비쥬얼 스튜디오에서 생성해주는 `Settings` 클래스를 사용하라. 실제값은 `app.config`나 `web.config`에서 관리한다. (웬만하면 설정 공간을 만들지마라.)

## 워닝 레벨을 제일 높여라 ![](imgs/must.png) ##

개발 환경에서는 C# 컴파일러를 **워닝 레벨 4**를 사용하도록 설정하고, **워닝을 에러처럼 다룬다** 옵션을 활성화한다. 코드 퀄리티를 가능한 높여주도록 컴파일러가 도와줄 것이다.

## `AssemblyInfo.cs` 파일의 속성들을 적당해 채워라 ![](imgs/may.png) ##

회사 이름, 설명, 저작권 명시, 버전 등을 확실히 하기 위해서 채워넣도록 한다. 모든 어셈블리들에서 공통적으로 사용하는 같은 값들이 있다면 `AssemblyInfo.cs` 밖으로 뽑아서 `SolutionInfo.cs`에 넣으면 해당 솔루션 내 모든 프로젝트에서 공유할 수 있다.

## 간단한 표현에는 LINQ를 삼간다 ![](imgs/may.png) ##

이렇게 보다는

```c#
var query = from item in items where item.Length > 0;
```

`System.Linq` 네임스페이스의 확장 메소드를 사용하는 것이 좋다.

```c#
var query = items.Where(i => i.Length > 0);
```

왜냐면 LINQ 쿼리들은 가독성을 위해 여러줄에 걸쳐 쓰일 수는 있지만, 이 예제에서는 두번째가 더 가독성이 좋다.


## 딜리게이트보다는 람다 표현식을 사용한다 ![](imgs/should.png) ##

람다 표현식은 익명 딜리게이트보다 훨씬 우아한 대안을 제공한다. 그래서 이렇게보다는

```c#
Customer c = Array.Find(customers, delegate(Customer c) 
{ 
	return c.Name == "Tom"; 
});
```

람다 표현식을 사용하라:

```c#
Customer c = Array.Find(customers, c => c.Name == "Tom");
```
 
혹은 이게 더 좋다

```c#
var customer = customers.Where(c => c.Name == "Tom");
```


## 다이나믹 객체와 통신할 때만 다이나믹 키워드를 쓴다 ![](imgs/must.png) ##

다이나믹 키워드는 다이나믹 언어를 다루기 위해 도입되었다. 컴파일러가 좀 복잡한 리플렉션 코드를 생성해야하기 때문에 심각한 병목현상이 온다.
 
`Type.GetProperty()`와 `Type.GetMethod()`에 대한 대안으로 동적으로 생성된 (`Activator`를 사용하는)인스턴스의 멤버/메소드를 호출할 때만 사용하거나, COM Interop 타입을 다룰 때만 사용한다.

## Task에서는 되도록 `async`/`await` ##

C# 5.0 키워드를 사용하면 여러 비동기 작업을 연쇄적으로 할 필요가 있을 때도 코드를 순차적으로 실행할 수 있고 관리하기가 매우 편해진다. 예를 들어 이렇게 메소드를 만들기 보다는:

```c#
public Task<Data> GetDataAsync()
{
    return MyWebService.FetchDataAsync()
                       .ContinueWith(t => new Data (t.Result));
}
```

이렇게 만든다:

```c#
public async Task<Data> GetDataAsync()
{
    var result = await MyWebService.FetchDataAsync();

    return new Data (result);
}
```

