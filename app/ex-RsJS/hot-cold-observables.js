import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/* 
const source$ = Observable.of(1, 2, 3);
source$.subscribe(console.log); */

exports.learn = function() {

    const code$ = new Observable(observer => {
        //const producer = new producer(); 此时observable负责生产数据；而在hot observable里面，不生产数据，只是数据的搬运工
    });
    const theObserver = {
        // consume data
        // observer必须有一个next函数 其他没什么特别
        // 观察者不关心数据是何时产生的
        next: item => console.log(item),
        // 如果不打算处理异常 可以使用null来占位
        error: err => console.log(err),
        complete: () => console.log("Stream stops here.")
    };
    // 调用subscribe就会触发对observer的操作 observer就会去拿数据执行一些任务
    const subscription = source$.subscribe(theObserver);

    setTimeout(() => {
        // 取消订阅后无论怎么调用next 都不会有数据输出了 因为observer已经与observable断开联系
        subscription.unsubscribe();
    }, 3500);

};