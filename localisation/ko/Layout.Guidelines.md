# 레이아웃 가이드라인 (Layout Guidelines) #

## 일반적인 레이아웃 사용하기 (Use a common layout) ![](imgs/must.png) ##

* 각 줄의 길이는 130자 이내로 합니다.
* 4 공백 들여쓰기를 사용하고, 탭을 사용하지 않습니다.
* `if`같은 키워드, 표현식의 사이에는 공백을 하나만 넣습니다. 하지만 `(`뒤와
  `)`의 앞에는 공백을 넣지 않습니다. 예를 들어:

```c#
if (condition == null)
```

* `+`, `-`, `==`같은 연산자의 주변에는 공백을 넣습니다.
* `if`, `else`, `do`, `while`, `for`, `foreach`같은 키워드를 사용할 때는
  언어에서 필요없을지라도 중괄호를 항상 열고 닫아줍니다.
* 중괄호는 항상 새 줄에서 열고 닫아 줍니다.
* 오브젝트 이니셜라이져에서 각 프로퍼티의 초기화는 새 줄에서 하고 들여쓰기를
  맞춰줍니다. 이런식으로요.

```c#
var dto = new ConsumerDto()
          {
              Id = 123,
              Name = "Microsoft",
              PartnerShip = PartnerShip.Gold,
          }
```

* 람다 식에는 들여쓰기를 넣지 않습니다. 이렇게 합시다.

```c#
methodThatTakesAnAction.Do(x =>
{
  // do something like this 
}
```

* 전 LINQ 문은 한 줄에 적거나 각 키워드를 같은 들여쓰기로 시작하게 합니다.

```c#
var query = from product in products where product.Price > 10 select product;
```

아니면

```c#
var query =
    from product in products
    where product.Price > 10
    select product;
```

* LINQ 문은 `from`으로 시작하고, 제약사항을 섞지 않습니다.
* 모든 비교 조건에 소괄호를 추가하지만 조건이 하나라면 소괄호를 넣지 않습니다. 예를 들면

```c#
if (!String.IsNullOrEmpty(str) && (str != "new"))
```

* 여러 줄의 구문, 멤버의 사이, 중괄호의 뒤, 관련없는 코드블록, `#region`
  키워드의 주변, 다른 회사의 구분사용 사이에는 빈 줄을 넣습니다.


## 회사에 따라 네임스페이스 정렬하고 그룹짓기 (Order and group namespaces according the company) ![](imgs/may.png) ##

```c#
// Microsoft namespaces are first
using System;
using System.Collections;
using System.XML;
 
// Then any other namespaces in alphabetic order
using AvivaSolutions.Business;
using AvivaSolutions.Standard;

using Telerik.WebControls;
using Telerik.Ajax;
```


## 멤버는 잘 배치하기 (Place members in a well-defined order) ![](imgs/must.png) ##

일반적인 순서로 관리하면 다른 팀 멤버가 더 코드를 찾기 쉽게 합니다. 일반적으로,
소스 파일은 책을 읽는것 처럼 위에서 아래로 읽을 수 있어야 합니다. 이렇게 하면
읽는 사람이 코드 파일을 위아래로 검색하는 것 예방할 수 있습니다.

1.	private 필드와 상수 (region)
2.	public 상수
3.	public 읽기전용 스테틱 필드
4.	팩토리 함수
5.	생성자와 소멸자
6.	이밴트
7.	public 프로퍼티
8.	호출 순으로 기타 함수, private 프로퍼티


## `#region`의 사용을 피하기 (Be reluctant with `#region`s) ![](imgs/must.png) ##

`#region`은 도움이 될 수도 있지만, 클래스의 주요 목적을 숨길 수도 있습니다. 그러므로, `#region`은 다음의 경우에만 사용합시다.

* Private 필드와 상수 (`Private Definitions` region에 두는게 바람직합니다).
* 중첩 클래스
* 인터페이스 구현 (인터페이스가 클래스의 주요 목적이 아닐때에만)

