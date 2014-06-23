# 네이밍 가이드라인 Naming Guidelines #

## 영어 사용하기 Use English ![](imgs/must.png) ##

모든 타입 멤버, 파라메터, 변수는 영어 단어로 만들어야 합니다.

* 쉽게 읽을 수 있고, 문법적으로 정확한 이름만 사용합니다. 예를 들어  `AlignmentHorizontal`보다는 `HorizontalAlignment`가 더 가독성이 좋습니다.
* 간결함보다는 가독성을 중시합니다. 프로퍼티 이름으로 `ScrollableX`(x축에 대한 모호한 참조)보다는 `CanScrollHorizontally`가 더 좋습니다.
* 프로그래밍 언어에서 널리 키워드로 쓰여 충돌할 수 있는 이름은 피합니다.

![EXCEPTION](imgs/exception.png) 대부분의 프로젝트에서, 도메인가 회사에서만 사용하는 단어나 문장을 사용할 것입니다. 비주얼 스투디오의 **정적 코드 분석기** 가 모든 코드에 대해 스팰링 체크를 하기 떄문에, 그런 용어들을 [사용자 코드 분석 사전](http://blogs.msdn.com/b/codeanalysis/archive/2007/08/20/new-for-visual-studio-2008-custom-dictionaries.aspx)에 넣을 필요가 있을겁니다.

![NOTE](imgs/note.png) Doomen의 원문에서는 *미국* 영어를 사용하도록 명시 되어있었습니다. 이 문서에서는 *미국* 을 의도적으로 생략하였습니다.


## 언어 요소에 따라 적절히 대소문자 구분하기 Use proper casing for language elements ![](imgs/must.png) ##

언어 요소 | 대소문자 구분 | 예제
-----------------|--------|--------
Class, Struct | Pascal | `AppDomain`
Interface | Pascal | `IBusinessService`
Enumeration type | Pascal | `ErrorLevel`
Enumeration values | Pascal | `FatalError`
Event | Pascal | `Click`
Private field | Camel | `listItem`
Protected field | Pascal | `MainPanel`
Const field | Pascal | `MaximumItems`
Const variable | Camel | `maximumItems`
Read-only static field | Pascal | `RedValue`
Variable | Camel | `listOfValues`
Method | Pascal | `ToString`
Namespace | Pascal | `System.Drawing`
Parameter | Camel | `typeName`
Type Parameter | Pascal | `TView`
Property | Pascal | `BackColor`


## 변수, 파라메터, 타입 멤버에 숫자를 포함하지 않기 Don't include numbers in variables, parameters and type members ![](imgs/may.png) ##

숫자를 사용한 대부분의 경우는 명확하고 목적이 드러나는 이름을 짓지 못할 때의
개으른 변명일 뿐입니다.


## 필드에 접두사 붙이지 않기 Don't prefix fields ![](imgs/must.png) ##

예를들어, 정적 필드와 정적이지 않은 필드를 구별하기위해 `g_` 나 `s_` 를 사용하지
마세요. 일반적으로, 메서드에서 멤버 필드가 너무 크면 로컬 변수를 구별하기 힘들어집니다.
`_currentUser`, `mUserName`, `m_loginTime`는 잘못된 식별자 이름의 예 입니다.


## 약어를 사용하지 않기 Don't use abbreviations ![](imgs/should.png) ##

예를 들어, `OnBtnClick` 보다는 `OnButtonClick`를 사용하세요. `i` 나 `q`같은 한
문자 변수명을 피하세요. 대신 `index` 나 `query`를 사용하세요.

![EXCEPTION](imgs/exception.png) 널리 쓰이거나 도메인내에서 잘 알려진 약어라면 사용하세요. 예를 들어, `UserInterface`대신 `UI`를 사용하세요.


## 타입이 아닌 의미에 따른 멤버, 파라메터, 변수의 이름 짓기 Name a member, parameter or variable according its meaning and not its type ![](imgs/should.png) ##

* 기능의 이름을 사용하세요. 예를 들어 `GetLength`는 `GetInt`보다 좋은
  이름입니다.
* `Enum`, `Class`, `Struct`같은 용어를 이름에 사용하지 마세요.
* 콜랙션 타입의 식별자는 **복수형**일 필요가 있습니다.


## 타입은 명사, 명사구, 형용사구로 이름 짓기 Name types using nouns, noun phrases or adjective phrases ![](imgs/should.png) ##

나쁜 예로는 `SearchExamination` (시험을 검색하기 위한 페이지), `Common` (명사로 끝나지도 않았고, 목적을 설명하지도 않음) and `SiteSecurity` (룰에는 부합하지만, 목적에대한 설명이 없습니다.)가 있고, 좋은 예는 `BusinessBinder`, `SmartTextBox`, `EditableSingleCustomer`가 있습니다.

`Utility` 나 `Helper`같은 용어를 클래스에 포함시키지 마세요. 그런 이름이 포함된 클래스는 보통 정적 클래스고 객체지향을 고려하지 않은 도입입니다. (자세한 내용은 [Avoid static classes](Class.Design.Guidelines.md#avoid-static-classes-)를 참조하세요.)


## 제네릭 타입은 설명할 수 있게 이름 짓기 Name generic type parameters with descriptive names ![](imgs/should.png) ##

* 타입 파라메터의 이름은 항상 접두어로 `T`문자를 사용하세요.
* 한 문자 이름이 완벽하게 자신을 표현할 수 있고 긴 이름이 어떠한 가치도 없는 경우를 제외하면, 항상 설명할 수 있는 이름을 사용하세요. 그런 경우에는 한 글자 `T`를 파라메터로 사용하세요.
* 
* 파라메터 이름에 타입 파라메터의 제약 조건을 나타내는 것을 고려해보세요. 예를 들어, `ISession`으로 제한 된 파라메터는 `TSession`이라고 지을 수 있습니다.


## 클래스나 열거형의 이름을 멤버에서 반복하지 않기 Don't repeat the name of a class or enumeration in its members ![](imgs/must.png) ##

```c#
class Employee
{
    // Wrong! 
    static GetEmployee() {}
    DeleteEmployee() {}

    // Right
    static Get() {...}
    Delete() {...}

    // Also correct.
    AddNewJob() {...}
    RegisterForMeeting() {...}
}
```


## .NET 프레임워크 클래스의 멤버랑 비슷하게 멤버의 이름 짓기 Name members similarly to members of related .NET Framework classes ![](imgs/may.png) ##

.NET 개발자는 이미 프레임워크에서 사용하는 이름짓기에 익숙합니다. 그래서 같은
방법으로 이름을 지으면 클래스에서 멤버를 찾기 쉬워집니다. 예를 들어, 콜랙션의
역활을 하는 클래스를 정의 했다면, `AddItem`, `Delete`, `NumberOfItems` 대신
 Add`, `Remove`, `Count` 같은 멤버를 제공하세요.


## 짧은 이름이나 다른 이름으로 오해할 수 있는 이름 피하기 Avoid short names or names that can be mistaken with other names ![](imgs/must.png) ##

맞는 코드이긴 하지만, 다음 구문은 매우 혼동될 수 있습니다.

```c#
bool b001 = (lo == l0) ? (I1 == 11) : (lOl != 101);
```


## 프로퍼티의 이름을 재대로 짓기 Properly name properties ![](imgs/should.png) ##

* 프로퍼티의 이름을 명사, 명사구, 형용사구로 지으세요.
* 불린 프로퍼티의 이름은 긍정형(affirmative phrase)로 지으세요. 예) `CantSeek` 보다는 `CanSeek`.
* 불린 프로퍼티의 접두어로 `Is`, `Has`, `Can`, `Allows`, `Supports`의 사용을
  고려해 보세요.
* 타입과 같은 프로퍼티 이름을 사용하는 것을 고려해보세요. 열거형의 강 타입
  프로퍼티가 있다면 프로퍼티의 이름은 열거형의 이름을 사용 할 수 있습니다. 예를
  들어`CacheLevel`라는 이름의 열거형이 있다면, 열거형의 값을 반환하는 프로퍼티는
  `CacheLevel`라 이름 짓습니다.


## 동사-객체로 메서드 이름 짓기 Name methods using verb-object pair ![](imgs/should.png) ##

`ShowDialog`처럼 메서드의 이름을 동사-객체로 지으세요. 좋은 이름은 맴버에게
*무엇*에 관한 것인지, 가능하다면 *왜*에 대한 힌트도 줍니다. 또 메서드 이름에는
`And`를 넣지 마세요. 이는 메서드가 하나이상의 일을 하는 것을 의미하고 [단일 책임
원칙](Member.Design.Guidelines.md#a-method-or-property-does-only-one-thing-)을 위배합니다.



## 이름, 레이어, 동사, 기능으로 네임스페이스 이름 짓기 Name namespaces using names, layers, verbs and features ![](imgs/may.png) ##

밑의 네임스페이스는 이 가이드라인의 매우 좋은 예입니다.

* `NHibernate.Extensibility`
* `Microsoft.ServiceModel.WebApi`
* `Microsoft.VisualStudio.Debugging`
* `FluentAssertion.Primitives`
* `CaliburnMicro.Extensions`

![NOTE](imgs/note.png) 네임스페이스가 타입 이름을 가지게 하지말고 대신 복수형의 명사를 쓰세요. 예를들어, `Collections`는 보통 괜찮은 이름입니다.


## 이벤트의 이름엔 동사나 동사구를 사용하기 Use a verb or verb phrase to name an event ![](imgs/should.png) ##

`Click`, `Deleted`, `Closing`, `Minimizing`, `Arriving` 같은 동사나 동사구를 사용해 이벤트의 이름을 지으세요. 예를 들어 검색 이벤트의 정의는 이렇게 할 수 있습니다.

```c# 
public event EventHandler<SearchArgs> Search;
```


## 이벤트 전, 후를 표현하기 위해 `-ing`, `-ed` 사용하기 Use `-ing` and `-ed` to express pre-events and post-events ![](imgs/may.png) ##

예를 들어, 창이 닫히기 전에 발생하는 닫힘 이벤트는 `Closing`이라 하고 창이
닫힌 후에 발생하는 이벤트는 `Closed`라고 할 수 있습니다. 이벤트의 전후를
알리기위해 `Before`나 `After`를 접두사나 접미사로 사용하지 마세요. 

객체를 삭제하는 이벤트를 정의한다고 합시다. `Deleting`, `Deleted` 이벤트를 `BeginDelete`, `EndDelete`로 정의 하지 마세요. 그 이벤트들은 다음과 같이 정의합니다.

* `Deleting`: 객체가 삭제되기 직전에 발생
* `Delete`: 객체가 이벤트 핸들러에 의해 삭제할 필요가 있을때 발생
* `Deleted`: 객체가 이미 지워졌을때 발생


## 이벤트에 전치사 On 붙이기 Prefix an event handler with On ![](imgs/may.png) ##

이벤트를 핸들링하는 메서드에 전치사 `On`을 붙이는것은 좋은 습관입니다. 예를 들어 `Closing` 이벤트를 벤들링하는 메서드는 `OnClosing`라 붙일 수 있습니다.


## 관련 없는 람다 파라메터에 밑줄 사용하기 Use an underscore for irrelevant lambda parameters ![](imgs/may.png) ##

예를 들어, 람다문을 사용해 이밴트를 구독한다고 하면, 이밴트의 실제 파라메터는 무관합니다.
이럴 때 좀 더 명시적으로 무관함을 나타내기 위해 다음과 같은 규칙을 사용합니다.

```c#
button.Click += (_, __) => HandleClick();
```


## 클래스의 그룹 확장 메서드는 접미사로 Extensions 붙이기 Group extension methods in a class suffixed with Extensions ![](imgs/may.png) ##

확장 메서드가 다른 맴버나 확장 메서드와 충돌한다면, 클래스 이름을 앞에 붙여 호출해야합니다. 확장 전용의 클래스에 접미사로 `Extensions`를 붙이면 가독성이 향상됩니다.


## `TaskAsync`의 비동기 메서드 뒤에 `Async`붙이기 Postfix asynchronous methods with `Async` of `TaskAsync` ![](imgs/should.png) ##

`Task`나 `Task<TResult>`를 리턴하는 메서드에는 뒤에 `Async`를 붙여 주는게 일반적입니다만 이미 있다면 대신 `TaskAsync`를 사용하세요.

