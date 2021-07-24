@nestjs/common
// cache
/// constants
CACHE_MANAGER       
CACHE_MODULE_OPTIONS
CACHE_KEY_METADATA  
CACHE_TTL_METADATA  
/// CacheModule
CacheModule
/// provider
createCacheManager
/// options
defaultCacheOptions
{
  ttl: 5,
  max: 100,
  store: 'memory',
};
/// decorators
CacheTTL
CacheKey
/// interceptors
HttpAdapterHost
CacheInterceptor
/// interface / module
CacheModuleOptions
CacheOptionsFactory
CacheModuleAsyncOptions
/// interface / manager
LiteralObject
CacheStore
CacheStoreSetOptions
CacheStoreFactory
CacheManagerOptions


// interfaces
Abstract, ArgumentMetadata, ArgumentsHost, BeforeApplicationShutdown, CallHandler, CanActivate, ClassProvider, ContextType, DynamicModule, ExceptionFilter, ExecutionContext, ExistingProvider, FactoryProvider, ForwardReference, HttpServer, INestApplication, INestApplicationContext, INestMicroservice, IntrospectionResult, MessageEvent, MiddlewareConsumer, ModuleMetadata, NestApplicationOptions, NestHybridApplicationOptions, NestInterceptor, NestMiddleware, NestModule, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit, Paramtype, PipeTransform, Provider, RpcExceptionFilter, Scope, ScopeOptions, Type, ValidationError, ValueProvider, WebSocketAdapter, WsExceptionFilter, WsMessageHandler,