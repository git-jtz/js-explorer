import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/* 
const source$ = Observable.of(1, 2, 3);
source$.subscribe(console.log); */

exports.learn = function() {
    // pruduce data
    const onSubscribe = observer => {
        //observer.next(1);
        //observer.next(2);
        //observer.next(3);

        // 由这个观察者的代理来决定 何时调用next函数
        // 这个函数传递给Observable 用于生产数据以及通知订阅者处理数据
        // 特定于某个观察者的处理逻辑则定义在各自的next函数中
        let number = 1;
        const handle = setInterval(() => {
            observer.next(number++);
            /* if(number > 3) {
                clearInterval(handle);
            } */
        }, 1000);
    };

    const source$ = new Observable(onSubscribe);
    const theObserver = {
        // consume data
        // observer必须有一个next函数 其他没什么特别
        // 观察者不关心数据是何时产生的
        next: item => console.log(item)
    };
    // 调用subscribe就会触发对observer的操作 observer就会去拿数据执行一些任务
    source$.subscribe(theObserver);

};