export default class LocalStorage {
    check (checker, val) {
        if (!localStorage.getItem(checker)) {
            localStorage.setItem(checker, val);
          };
    };
};
