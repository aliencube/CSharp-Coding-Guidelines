# Naming Guidelines #

## Use English ![](imgs/must.png) ##

All type members, parameters and variables should be named using words from the English language.

* Choose easily readable, preferably grammatically correct names. For example, `HorizontalAlignment` is more readable than `AlignmentHorizontal`.
* Favour readability over brevity. The property name `CanScrollHorizontally` is better than `ScrollableX` (an obscure reference to the X-axis).
* Avoid using names that conflict with keywords of widely used programming languages.

![EXCEPTION](imgs/exception.png) In most projects, you will use words and phrases from your domain and names specific to your company. Visual Studio's **Static Code Analysis** will perform a spelling check on all code, so you may need to add those terms to a [Custom Code Analysis Dictionary](http://blogs.msdn.com/b/codeanalysis/archive/2007/08/20/new-for-visual-studio-2008-custom-dictionaries.aspx).

![NOTE](imgs/note.png) Doomen's original document clearly stated that *Use US-English*. In this document, the *US* part is deliberately omitted.


## Use proper casing for language elements ![](imgs/must.png) ##

Language element | Casing | Example
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


## Don't include numbers in variables, parameters and type members ![](imgs/may.png) ##

In most cases they are a lazy excuse for not defining a clear and intention-revealing name.


## Don't prefix fields ![](imgs/must.png) ##

For example, don't use `g_` or `s_` to distinguish static versus non-static fields. In general, a method in which it is difficult to distinguish local variables from member fields is too big. Examples of incorrect identifier names are: `_currentUser`, `mUserName`, `m_loginTime`.


## Don't use abbreviations ![](imgs/should.png) ##

For example, use `OnButtonClick` rather than `OnBtnClick`. Avoid single character variable names, such as `i` or `q`. Use `index` or `query` instead.

![EXCEPTION](imgs/exception.png) Use well-known abbreviations that are widely accepted or well-known within the domain you work. For instance, use `UI` instead of `UserInterface`. 


## Name a member, parameter or variable according its meaning and not its type ![](imgs/should.png) ##

* Use functional names. For example, `GetLength` is a better name than `GetInt`.
* Don't use terms like `Enum`, `Class` or `Struct` in a name.
* Identifiers that refer to a collection type should have a **plural** name.


## Name types using nouns, noun phrases or adjective phrases ![](imgs/should.png) ##

Bad examples include `SearchExamination` (a page for searching for examinations), `Common` (does not end with a noun, and does not explain its purpose) and `SiteSecurity` (although the name is technically okay, it does not say anything about its purpose). Good examples include `BusinessBinder`, `SmartTextBox`, or `EditableSingleCustomer`.

Don't include terms like `Utility` or `Helper` in classes. Classes with a name like that are usually static classes and are introduced without considering the object-oriented principles (See [Avoid static classes](Class.Design.Guidelines.md#avoid-static-classes-)).


## Name generic type parameters with descriptive names ![](imgs/should.png) ##

* Always prefix descriptive type parameter names with the letter `T`.
* Always use a descriptive names unless a single-letter name is completely self-explanatory and a longer name would not add value. Use the single letter `T` as the type parameter in that case.
* Consider indicating constraints placed on a type parameter in the name of parameter. For example, a parameter constrained to `ISession` may be called `TSession`.


## Don't repeat the name of a class or enumeration in its members ![](imgs/must.png) ##

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


## Name members similarly to members of related .NET Framework classes ![](imgs/may.png) ##

.NET developers are already accustomed to the naming patterns the framework uses, so following this same pattern helps them find their way in your classes as well. For instance, if you define a class that behaves like a collection, provide members like `Add`, `Remove` and `Count` instead of `AddItem`, `Delete` or `NumberOfItems`.


## Avoid short names or names that can be mistaken with other names ![](imgs/must.png) ##

Although technically correct, the following statement can be quite confusing.

```c#
bool b001 = (lo == l0) ? (I1 == 11) : (lOl != 101);
```


## Properly name properties ![](imgs/should.png) ##

* Do name properties with nouns, noun phrases, or occasionally adjective phrases.
* Do name Boolean properties with an affirmative phrase. eg) `CanSeek` instead of `CantSeek`.
* Consider prefixing Boolean properties with `Is`, `Has`, `Can`, `Allows`, or `Supports`.
* Consider giving a property the same name as its type. When you have a property that is strongly typed to an enumeration, the name of the property can be the same as the name of the enumeration. For example, if you have an enumeration named `CacheLevel`, a property that returns one of its values can also be named `CacheLevel`.


## Name methods using verb-object pair ![](imgs/should.png) ##

Name methods using a verb-object pair such as `ShowDialog`. A good name should give the member a hint on the *what*, and if possible, the *why*. Also, don't include `And` in the name of the method. It implies that the method is doing more than one thing, which violates the single responsibility principle explained in [here](Member.Design.Guidelines.md#a-method-or-property-does-only-one-thing-).


## Name namespaces using names, layers, verbs and features ![](imgs/may.png) ##

For instance, the following namespaces are good examples of that guideline.

* `NHibernate.Extensibility`
* `Microsoft.ServiceModel.WebApi`
* `Microsoft.VisualStudio.Debugging`
* `FluentAssertion.Primitives`
* `CaliburnMicro.Extensions`

![NOTE](imgs/note.png) Never allow namespaces to contain the name of a type, but a noun in its plural form, eg) `Collections`, is usually okay.


## Use a verb or verb phrase to name an event ![](imgs/should.png) ##

Name events with a verb or a verb phrase. For example: `Click`, `Deleted`, `Closing`, `Minimizing`, and `Arriving`. For example, the declaration of the Search event may look like this:

```c# 
public event EventHandler<SearchArgs> Search;
```


## Use `-ing` and `-ed` to express pre-events and post-events ![](imgs/may.png) ##

For example, a close event that is raised before a window is closed would be called `Closing` and one that is raised after the window is closed would be called `Closed`. Don't use `Before` or `After` prefixes or suffixes to indicate pre and post events.
 
Suppose you want to define events related to the deletion process of an object. Avoid defining the `Deleting` and `Deleted` events as `BeginDelete` and `EndDelete`. Define those events as follows:

* `Deleting`: Occurs just before the object is getting deleted
* `Delete`: Occurs when the object needs to be deleted by the event handler.
* `Deleted`: Occurs when the object is already deleted.


## Prefix an event handler with On ![](imgs/may.png) ##

It is good practice to prefix the method that handles an event with `On`. For example, a method that handles the `Closing` event could be named `OnClosing`.


## Use an underscore for irrelevant lambda parameters ![](imgs/may.png) ##

If you use a lambda statement, for instance, to subscribe to an event, and the actual parameters of the event are irrelevant, use the following convention to make that more explicit.

```c#
button.Click += (_, __) => HandleClick();
```


## Group extension methods in a class suffixed with Extensions ![](imgs/may.png) ##

If the name of an extension method conflicts with another member or extension method, you must prefix the call with the class name. Having them in a dedicated class with the `Extensions` suffix improves readability.


## Postfix asynchronous methods with `Async` of `TaskAsync` ![](imgs/should.png) ##

The general convention for methods that return `Task` or `Task<TResult>` is to post-fix them with `Async`, but if such a method already exist, use `TaskAsync` instead.

