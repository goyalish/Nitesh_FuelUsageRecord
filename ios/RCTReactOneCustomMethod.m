//
//  RCTReactOneCustomMethod.m
//  NiteshFuelUsageRecord
//
//  Created by Nitesh goyal on 11/07/22.
//

#import <UIKit/UIKit.h>
#import "RCTReactOneCustomMethod.h"

@implementation RCTReactOneCustomMethod

// To export a module named ReactOneCustomMethod
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getPhoneID:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject)
{
  NSString *deviceName = [[UIDevice currentDevice] name];
  resolve(deviceName);
}

RCT_EXPORT_METHOD(getDeviceType:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject)
{
  NSString *deviceType = @"iOS";
  resolve(deviceType);
}

RCT_EXPORT_METHOD(getPhoneInfo:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject)
{
  NSString* identifier = [[[UIDevice currentDevice] identifierForVendor] UUIDString]; // IOS 6+
  NSDictionary *infoDictionary = [[NSBundle mainBundle]infoDictionary];
  NSString *deviceName = [[UIDevice currentDevice] name];
  NSString *MANUFACTURER = [[UIDevice currentDevice] systemName];
  NSString *MODEL = [[UIDevice currentDevice] model];
  NSString *OS_NAME = [[UIDevice currentDevice] systemName];
  NSString *OS_VERSION = [[UIDevice currentDevice] systemVersion];
  NSString *version = infoDictionary[@"CFBundleShortVersionString"];
  NSString *build = infoDictionary[(NSString*)kCFBundleVersionKey];
  NSString *language = [[NSLocale preferredLanguages] firstObject];

  
  NSDictionary *dict = @{
    @"Id" : identifier,
    @"Manufacturer" : MANUFACTURER,
    @"Device" : deviceName,
    @"Model" : MODEL,
    @"OS_Name" : OS_NAME,
    @"OS_Version" : OS_VERSION,
    @"Release" : build,
    @"versionName" : version,
    @"versionCode" : version,
    @"language" : language
  };

  resolve(dict);
}

RCT_EXPORT_METHOD(checkBalance:(NSDictionary*)data: (RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject)
{
  if([data[@"total"] integerValue] < [data[@"userMaxAllowance"] integerValue]) {
    resolve(@1);
  } else {
    resolve(@0);
  }
}

RCT_EXPORT_METHOD(getFuelData:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject)
{
  NSDictionary *data1 = @{
    @"fuelType" : @"Petrol",
    @"pricePerLiter" : @30,
  };
  
  NSDictionary *data2 = @{
    @"fuelType" : @"Diesel",
    @"pricePerLiter" : @40,
  };
  
  NSDictionary *data3 = @{
    @"fuelType" : @"Battery Charge",
    @"pricePerLiter" : @10,
  };
  
  NSArray *data = [NSArray arrayWithObjects:data1, data2, data3, nil];
  
  NSDictionary *finalData = @{
    @"data" : data,
    @"userMaxAllowance" : @400,
  };
  resolve(finalData);
}

@end

