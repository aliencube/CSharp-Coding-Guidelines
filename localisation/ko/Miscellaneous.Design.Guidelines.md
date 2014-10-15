# 일반적인 사항 설계 가이드라인 (Miscellaneous Design Guidelines) #

## Throw exceptions rather than returning some kind of status value ![](imgs/should.png) ##

A code base that uses return values for reporting the success or failure tends to have nested if-statements sprinkled all over the code. Quite often, a caller forgets to check the return value anyhow. Structured exception handling has been introduced to allow you to throw exceptions and catch or replace exceptions at a higher layer. In most systems it is quite common to throw exceptions whenever an unexpected situations occurs.

## 일종의 상태값을 반환하기 보다 예외를 던진다 ![](imgs/should.png) ##

코드에서 성공이나 실패를 알려주기 위해 값으로 반환하게 되면 복잡한 if문이 코드 전체에 산재하게 된다. 또한 호출을 하고나서 반환하는 값을 확인하는 것을 잊는 경우도 빈번하다. 구조적인 예외 처리는 예외를 던지고(throw) 잡거나(catch) 또는 상위 레이어에서 예외를 대체하는 방식으로 활용할 수 있도록 돕는다. 대다수의 시스템에서는 예기치 못한 상황이 발생하면 언제든 예외를 던지는게 일반적이다.


## Provide a rich and meaningful exception message text ![](imgs/should.png) ##

The message should explain the cause of the exception and clearly describe what needs to be done to avoid the exception.

## 예외 메시지 문구를 가치있게, 의미를 담아서 제공한다 ![](imgs/should.png) ##

메시지는 예외의 원인을 설명하고 예외를 피하기 위해서 어떤 작업이 필요한지 명확하게 설명할 수 있어야 한다.


## Throw the most specific exception that is appropriate ![](imgs/may.png) ##

For example, if a method receives a `null` argument, it should throw `ArgumentNullException` instead of its base type `ArgumentException`.

## 가장 적절하고 명확한 예외를 던진다 ![](imgs/may.png) ##

예를 들면, 메소드가 `null`을 인수로 받은 경우, 기본 타입인 `ArgumentException`로 예외를 처리하는 것 보다는 `ArgumentNullException`으로 처리하는 것이 바람직하다.


## Don't swallow errors by catching generic exceptions ![](imgs/must.png) ##

Avoid swallowing errors by catching non-specific exceptions, such as `Exception`, `SystemException`, and so on, in application code. Only top-level code, such as a last-chance exception handler, should catch a non-specific exception for logging purposes and a graceful shutdown of the application.

## 일반적인 예외를 잡아서 오류를 삼키지 말아야 한다 ![](imgs/must.png) ##

어플리케이션 코드에서 특정되지 않은 예외, 즉 `Exception`, `SystemException` 등을 사용해 오류를 삼키지 않아야 한다. 다만 가장 상위 레벨의 코드에서, 예를 들면 예외를 처리할 수 있는 마지막 부분에서는 로그로 남기기 위한 목적이나 어플리케이션의 우아한 종료(graceful shutdown) 등을 위해 사용할 수 있다.


## Properly handle exceptions in asynchronous code ![](imgs/should.png) ##

When throwing or handling exceptions in code that uses `async`/`await` or a `Task` remember the following two rules:

* Exceptions that occur within an `async`/`await` block and inside a `Task`'s action are propagated to the awaiter.
* Exceptions that occur in the code preceding the asynchronous block are propagated to the caller.

## 비동기 코드에서는 예외를 적절하게 처리한다 ![](imgs/should.png) ##

`async`/`await` 또는 `Task`를 사용한 코드에서 예외를 던지거나 처리하게 될 때 다음 두가지 규칙을 따라야 한다는 점을 기억하자:

* `async`/`await` 블럭이나 `Task` 내부에서 예외가 발생했을 때, 그 예외는 대기자(awaiter)까지 전달되어야 한다.
* 비동기 블럭이 진행되기 전에 예외가 발생했을 때, 그 예외는 호출자(caller)까지 전달되어야 한다.


## Always check an event handler delegate for `null` ![](imgs/must.png) ##

An event that has no subscribers is `null`, so before invoking, always make sure that the delegate list represented by the event variable is not `null`. Furthermore, to prevent conflicting changes from concurrent threads, use a temporary variable to prevent concurrent changes to the delegate.

```c#
event EventHandler<NotifyEventArgs> Notify;
void RaiseNotifyEvent(NotifyEventArgs args)
{
    EventHandler<NotifyEventArgs> handlers = Notify;
    if (handlers != null)
    {
        handlers(this, args);
    }
}
```

You can prevent the delegate list from being empty altogether. Simply assign an empty delegate like this:

```c#
event EventHandler<NotifyEventArgs> Notify = delegate {};
```

## `null`을 위해 이벤트 핸들러 대리자를 항상 확인한다 ![](imgs/must.png) ##

호출되는 코드가 없는 이벤트는 `null`이기 때문에 이벤트를 사용하기 전에 이벤트 변수가 담긴 대리자 목록이 `null`이 아닌지 항상 확인해야 한다. 또한 동시에 처리되는 스레드와의 충돌을 방지하기 위하여 임시 변수를 사용해 대리자를 동시간에 변경하지 않도록 해야 한다.

```c#
event EventHandler<NotifyEventArgs> Notify;
void RaiseNotifyEvent(NotifyEventArgs args)
{
    EventHandler<NotifyEventArgs> handlers = Notify;
    if (handlers != null)
    {
        handlers(this, args);
    }
}
```

대리자 목록을 완전히 비우는 것을 방지하기 위해서 다음과 같은 방식으로 빈 대리자를 부여할 수 있다:

```c#
event EventHandler<NotifyEventArgs> Notify = delegate {};
```


## Use a protected virtual method to raise each event ![](imgs/should.png) ##

Complying with this guideline allows derived classes to handle a base class event by overriding the protected method. The name of the protected virtual method should be the same as the event name prefixed with On. For example, the protected virtual method for an event named `TimeChanged` is named `OnTimeChanged`.

![NOTE](imgs/note.png) Derived classes that override the protected virtual method are not required to call the base class implementation. The base class must continue to work correctly even if its implementation is not called.

## 각각의 이벤트를 발생하기 위해 보호된 가상 메소드를 사용할 수 있다 ![](imgs/should.png) ##

이 가이드라인은 파생 클래스를 작성할 때 기초 클래스 이벤트를 보호된 메소드를 오버라이드해서 사용하는 것을 허용한다. 보호된 가상 메서드의 이름은 이벤트명에 접두사 On을 포함해야 한다. 예를 들면, 이벤트명이 `TimeChanged`일 때 보호된 가상 메소드는 `OnTimeChanged`를 사용해야 한다.

![NOTE](imgs/note.png) 파생 클래스로 보호된 가상 메소드를 오버라이드 할 때 기초 클래스의 구현을 호출하는 것이 필수는 아니다. 하지만 기초 클래스의 구현을 호출하지 않고도 기초 클래스는 지속적으로 정확하게 동작해야 한다.

 
## Consider providing property-changed events ![](imgs/may.png) ##

Consider providing events that are raised when certain properties are changed. Such an event should be named `PropertyChanged`, where Property should be replaced with the name of the property with which this event is associated.

![NOTE](imgs/note.png) If your class has many properties that require corresponding events, consider implementing the `INotifyPropertyChanged` interface instead. It is often used in the [Presentation Model](http://martinfowler.com/eaaDev/PresentationModel.html) and [Model-View-ViewModel](http://msdn.microsoft.com/en-us/magazine/dd419663.aspx) patterns.

## 속성(properties) 변경 이벤트를 제공할지 고려할 수 있다 ![](imgs/may.png) ##

특정 속성이 변경될 때 발생하는 이벤트를 제공할지 고려해야 한다. 이렇게 제공되는 이벤트는 `PropertyChanged`와 같은 이름을 써야 하고 이벤트와 연관된 속성의 이름도 이와 같이 변경되어야 한다.

![NOTE](imgs/note.png) 만약 작성된 클래스의 여러 속성들이 유사한 이벤트를 필요로 한다면 `INotifyPropertyChanged`와 같은 인터페이스를 구현하는 것을 고려한다. 이와 같은 방식은 [Presentation 모델](http://martinfowler.com/eaaDev/PresentationModel.html)이나 [모델-뷰-뷰모델](http://msdn.microsoft.com/en-us/magazine/dd419663.aspx) 패턴에서 종종 사용된다.


## Don't pass `null` as the sender argument when raising an event ![](imgs/must.png) ##

Often, an event handler is used to handle similar events from multiple senders. The sender argument is then used to get to the source of the event. Always pass a reference to the source (typically `this`) when raising the event. Furthermore don't pass `null` as the event data parameter when raising an event. If there is no event data, pass `EventArgs.Empty` instead of `null`.

![EXCEPTION](imgs/exception.png) On static events, the sender argument ![SHOULD](imgs/should.png) be `null`.

## 이벤트를 발생할 때 `null`을 전송자의 인자로 보내지 않는다 ![](imgs/must.png) ##

이벤트 핸들러는 종종 여러 개의 전송자로부터 비슷한 이벤트를 처리하기 위해 사용된다. 그래서 전송자의 인자가 이벤트의 출처를 얻기 위해 사용된다. 이벤트가 발생하게 될 때 항상 출처를 참조로 보내게 된다. (일반적으로 `this`를 쓴다.) 또한 이벤트를 발생할 때 `null`을 이벤트 데이터 매개변수로 보내서는 안된다. 이벤트 데이터가 존재하지 않는다면 `null` 대신 `EventArgs.Empty`를 사용해야 한다.

![EXCEPTION](imgs/exception.png) 정적 이벤트에 한해서 전송자의 인자는 `null`을 쓴다. ![SHOULD](imgs/should.png)


## Use generic constraints if applicable ![](imgs/should.png) ##

Instead of casting to and from the `object` type in generic types or methods, use `where` constraints or the `as` operator to specify the exact characteristics of the generic parameter. For example:

```c#
class SomeClass
{
    ...
}

// Don't
class MyClass<T>
{
    void SomeMethod(T t)
    {
        object temp = t;
        SomeClass obj = (SomeClass) temp;
    }
}

// Do
class MyClass<T> where T : SomeClass
{
    void SomeMethod(T t)
    {
        SomeClass obj = t;
    }
}
```

## 가능하면 제네릭 제약 조건을 사용한다 ![](imgs/should.png) ##

제네릭 타입이나 메소드를 `object` 타입에서 캐스팅하는 방식보다, 정확한 특징의 제네릭 매개변수를 쓸 수 있도록 `where` 제약 조건 또는 `as` 연산자를 사용할 수 있다. 예를 들면:

```c#
class SomeClass
{
    ...
}

// Don't
class MyClass<T>
{
    void SomeMethod(T t)
    {
        object temp = t;
        SomeClass obj = (SomeClass) temp;
    }
}

// Do
class MyClass<T> where T : SomeClass
{
    void SomeMethod(T t)
    {
        SomeClass obj = t;
    }
}
```


## Evaluate the result of a LINQ expression before returning it ![](imgs/must.png) ##

Consider the following code snippet:

```c#
public IEnumerable<GoldMember> GetGoldMemberCustomers()
{
    const decimal GoldMemberThresholdInEuro = 1000000;
    var q = (from customer in db.Customers
             where customer.Balance > GoldMemberThresholdInEuro
             select new GoldMember(customer.Name, customer.Balance));
    return q;
}
```

Since LINQ queries use deferred execution, returning `q` will actually return the expression tree representing the above query. Each time the caller evaluates this result using a `foreach` or something similar, the entire query is re-executed resulting in new instances of `GoldMember` every time. Consequently, you cannot use the `==` operator to compare multiple `GoldMember` instances. Instead, always explicitly evaluate the result of a LINQ query using `ToList()`, `ToArray()` or similar methods.

## LINQ 표현식이 결과를 반환하기 전에 평가한다 ![](imgs/must.png) ##

다음의 코드를 살펴보자:

```c#
public IEnumerable<GoldMember> GetGoldMemberCustomers()
{
    const decimal GoldMemberThresholdInEuro = 1000000;
    var q = (from customer in db.Customers
             where customer.Balance > GoldMemberThresholdInEuro
             select new GoldMember(customer.Name, customer.Balance));
    return q;
}
```

LINQ가 지연되어 실행되기 시작한 이후, 위에서 반환되는 `q`값은 실제로는 앞서 작성된 쿼리를 나타내는 실행 트리를 반환한다. 각각 호출자가 위 메서드를 `foreach`나 비슷한 무언가에서 사용한다면 전체 쿼리는 호출이 될 때마다 다시 실행되기 때문에 새로운 `GoldMember` 인스턴스를 매번 생성하게 된다. 그 결과로 여러 번 호출해서 가져온 여러 `GoldMember` 인스턴스를 비교하는데 `==` 연산자를 활용할 수 없게 된다. 그러므로 LINQ의 결과값을 `ToList()`, `ToArray()` 또는 비슷한 메소드를 사용해 항상 명시적으로 평가해야 한다.