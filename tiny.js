import clone from './modules/clone';
import extend from './modules/extend';
import inherits from './modules/inherits';
import EventEmitter from './modules/eventEmitter';
import ajax from './modules/ajax';
import isPlainObject from './modules/isPlainObject';
import { support } from './modules/support';
import classList from './modules/classList';
import { cookies } from './modules/cookies';
import { domEvents } from './modules/domEvents';

let tiny = {
    clone,
    extend,
    inherits,
    EventEmitter,
    ajax,
    isPlainObject,
    support,
    classList,
    cookies,
    Event: domEvents.Event,
    on: domEvents.on,
    bind: domEvents.on,
    one: domEvents.one,
    once: domEvents.one,
    off: domEvents.off,
    trigger: domEvents.trigger
};

if (typeof window !== 'undefined') {
    window.tiny = tiny;
}

export default tiny;
