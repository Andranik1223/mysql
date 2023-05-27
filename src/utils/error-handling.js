/* eslint-disable max-classes-per-file */
export class ServiceError extends Error {
    constructor(message, sc) {
        super(message);
        this.statusCode = sc;
        this.location = 'Service';
    }
}

export class RepositoryError extends Error {
    constructor(message, sc) {
        super(message);
        this.statusCode = sc;
        this.location = 'Repository';
    }
}

export class UtilsError extends Error {
    constructor(message, sc) {
        super(message);
        this.statusCode = sc;
        this.location = 'Utils';
    }
}
